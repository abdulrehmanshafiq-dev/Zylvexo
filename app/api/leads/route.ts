import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/auth";
import Lead from "@/models/Lead";

export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    let query = Lead.find(filter).sort({ createdAt: -1 });
    if (limit) query = query.limit(parseInt(limit, 10));

    const leads = await query;
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
