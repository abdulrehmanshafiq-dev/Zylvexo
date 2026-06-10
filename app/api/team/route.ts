import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/auth";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find({ isActive: true }).sort({
      order: 1,
    });
    return NextResponse.json(members);
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

    if (!body.name || !body.role) {
      return NextResponse.json(
        { error: "name and role are required" },
        { status: 400 }
      );
    }

    const member = await TeamMember.create(body);
    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
