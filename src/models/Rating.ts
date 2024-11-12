import mongoose, { Document, Schema } from 'mongoose';

interface IRating extends Document {
  recipeId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment?: string;
}

const ratingSchema: Schema<IRating> = new Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, {
  timestamps: true, 
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);
export default Rating;