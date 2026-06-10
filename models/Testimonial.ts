import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITestimonial extends Document {
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  clientAvatarUrl?: string;
  content: string;
  rating: number;
  projectRef?: Types.ObjectId;
  featured: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String },
    clientCompany: { type: String },
    clientAvatarUrl: { type: String },
    content: { type: String, required: true, minlength: 20 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    projectRef: { type: Schema.Types.ObjectId, ref: "Project" },
    featured: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
