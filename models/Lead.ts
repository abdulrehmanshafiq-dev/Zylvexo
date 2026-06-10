import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  company?: string;
  service:
    | "web-dev"
    | "ai-automation"
    | "seo"
    | "digital-marketing"
    | "full-package"
    | "other";
  budget: "under-1k" | "1k-5k" | "5k-10k" | "10k-plus" | "discuss";
  message: string;
  status: "new" | "contacted" | "qualified" | "closed";
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    company: { type: String },
    service: {
      type: String,
      enum: [
        "web-dev",
        "ai-automation",
        "seo",
        "digital-marketing",
        "full-package",
        "other",
      ],
      default: "other",
    },
    budget: {
      type: String,
      enum: ["under-1k", "1k-5k", "5k-10k", "10k-plus", "discuss"],
      default: "discuss",
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

export default mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", LeadSchema);
