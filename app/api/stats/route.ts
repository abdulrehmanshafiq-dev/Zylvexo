import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/auth";
import Project from "@/models/Project";
import Lead from "@/models/Lead";
import Testimonial from "@/models/Testimonial";
import TeamMember from "@/models/TeamMember";

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const [
      totalProjects,
      publishedProjects,
      totalLeads,
      newLeads,
      totalTestimonials,
      teamCount,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: "published" }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Testimonial.countDocuments(),
      TeamMember.countDocuments({ isActive: true }),
    ]);

    return NextResponse.json({
      totalProjects,
      publishedProjects,
      totalLeads,
      newLeads,
      totalTestimonials,
      teamCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
