import mongoose, { Schema, Document } from "mongoose";
import { generateSlug } from "@/lib/helpers";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: "web-dev" | "ai-automation" | "seo" | "digital-marketing";
  client?: string;
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  thumbnailUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ["web-dev", "ai-automation", "seo", "digital-marketing"],
    },
    client: { type: String },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    results: { type: [String], required: true, validate: [(v: string[]) => v.length >= 1, "At least one result is required"] },
    techStack: { type: [String], default: [] },
    thumbnailUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = generateSlug(this.title);
  }
  next();
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
