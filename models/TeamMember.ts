import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  skills: string[];
  linkedinUrl?: string;
  twitterUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    avatarUrl: { type: String },
    skills: { type: [String], default: [] },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
