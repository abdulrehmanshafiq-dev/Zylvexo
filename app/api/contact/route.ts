import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await Lead.countDocuments({
      email: email.toLowerCase(),
      createdAt: { $gte: oneHourAgo },
    });

    if (recentCount >= 2) {
      return NextResponse.json(
        { error: "Too many submissions" },
        { status: 429 }
      );
    }

    await Lead.create({
      name,
      email,
      company: body.company,
      service: body.service,
      budget: body.budget,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Thanks! We'll be in touch within 24 hours." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
