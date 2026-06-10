import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/auth";
import Project from "@/models/Project";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    if (isAdminRequest(request)) {
      const projects = await Project.find()
        .sort({ order: 1, createdAt: -1 });
      return NextResponse.json(projects);
    }

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const filter: Record<string, unknown> = { status: "published" };
    if (featured === "true") filter.featured = true;

    let query = Project.find(filter).sort({ order: 1, createdAt: -1 });
    if (limit) query = query.limit(parseInt(limit, 10));

    const projects = await query;
    return NextResponse.json(projects);
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

    const { title, category, problem, solution, results } = body;
    if (!title || !category || !problem || !solution) {
      return NextResponse.json(
        { error: "title, category, problem, and solution are required" },
        { status: 400 }
      );
    }
    if (!Array.isArray(results) || results.length < 1) {
      return NextResponse.json(
        { error: "At least one result is required" },
        { status: 400 }
      );
    }

    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
