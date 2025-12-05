import mongoose from "mongoose";

// Ingredient subdocument
const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

// Comment subdocument
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cuisine: { type: String },
    prepTime: { type: Number }, 
    cookTime: { type: Number },
    servings: { type: Number },
    ingredients: [IngredientSchema],
    instructions: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
    image: { type: String },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default RecipeModel;
