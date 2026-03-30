import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  shortCode: string;
  name: string;
  originalURL: string;
  clickCount: number;
  createdAt: Date;
}

const LinkSchema = new Schema<ILink>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  originalURL: {
    type: String,
    required: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

LinkSchema.index({ categoryId: 1, shortCode: 1 }, { unique: true });

const Link = mongoose.model<ILink>("Link", LinkSchema);

export default Link;