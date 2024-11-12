import mongoose, { Document, Schema } from 'mongoose';

interface IRecipe extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const recipeSchema: Schema<IRecipe> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
});

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
export default Recipe;