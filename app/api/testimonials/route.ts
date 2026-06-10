import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/auth";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ isApproved: true }).sort({
      featured: -1,
      createdAt: -1,
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.clientName || !body.content) {
      return NextResponse.json(
        { error: "clientName and content are required" },
        { status: 400 }
      );
    }

    if (body.content.length < 20) {
      return NextResponse.json(
        { error: "Content must be at least 20 characters" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.create({
      ...body,
      isApproved: false,
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
