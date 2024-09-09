// models/Review.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  bookId: string;
  content: string;  
  rating: number;
  userName: string;  
}

const ReviewSchema: Schema = new Schema({
  bookId: { type: String, required: true },
  content: { type: String, required: true },  
  rating: { type: Number, required: true },
  userName: { type: String, required: true },  
}, {
  timestamps: true,
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
