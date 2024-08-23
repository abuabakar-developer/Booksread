// models/Review.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  bookId: string;
  content: string;  // Ensure this is named 'content' to match the frontend
  rating: number;
  userName: string;  // Ensure this is named 'userName' to match the frontend
}

const ReviewSchema: Schema = new Schema({
  bookId: { type: String, required: true },
  content: { type: String, required: true },  // This is the description
  rating: { type: Number, required: true },
  userName: { type: String, required: true },  // This is the username
}, {
  timestamps: true,
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
