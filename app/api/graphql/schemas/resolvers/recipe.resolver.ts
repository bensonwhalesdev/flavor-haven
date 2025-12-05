import RecipeModel from "@/app/api/models/recipe.model";
import { connectDB } from "@/app/utils/connectdb";

export const recipeResolvers = {
  Query: {
    recipes: async (_: any, { search, cuisine }: any) => {
      try {
        await connectDB();
        const query: any = {};

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { "ingredients.name": { $regex: search, $options: "i" } },
          ];
        }

        if (cuisine) query.cuisine = cuisine;

        return await RecipeModel.find(query)
          .populate("author")
          .populate("likes")
          .populate("comments.user");
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch recipes");
      }
    },

    recipe: async (_: any, { id }: any) => {
      try {
        await connectDB();
        return await RecipeModel.findById(id)
          .populate("author")
          .populate("likes")
          .populate("comments.user");
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch recipe");
      }
    },

    userRecipes: async (_: any, { userId }: any) => {
      try {
        await connectDB();
        return await RecipeModel.find({ author: userId })
          .populate("author")
          .populate("likes")
          .populate("comments.user");
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch user recipes");
      }
    },
  },

  Mutation: {
    // ============================================
    // CREATE RECIPE (AUTH REQUIRED)
    // ============================================
    createRecipe: async (_: any, { input }: any, context: any) => {
      try {
        await connectDB();
        if (!context.user)
          throw new Error("You must be logged in to create a recipe.");
        const newRecipe = new RecipeModel({
          ...input,
          author: context.user.id,
        });

        const recipe = await newRecipe.save();
        return await recipe.populate("author");
      } catch (error: any) {
        console.error("Error creating recipe:", error);
        throw new Error(error.message || "Failed to create recipe");
      }
    }, 

    toggleLike: async (_: any, { recipeId }: any, context: any) => {
      try {
        await connectDB();

        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) throw new Error("Recipe not found"); 

        const userId = context.user?.id || null; 

        if (!userId) {
          throw new Error("You must be logged in to like a recipe.");
        }

        const index = recipe.likes.indexOf(userId);

        if (index > -1) recipe.likes.splice(index, 1);
        else recipe.likes.push(userId);

        await recipe.save();
        const updatedRecipe = await RecipeModel.findById(recipeId)
          .populate("author")
          .populate("likes");

        return updatedRecipe;
      } catch (error: any) {
        throw new Error(error.message || "Failed to toggle like");
      }
    },

    addComment: async (_: any, { recipeId, text }: any, context: any) => {
      try {
        await connectDB();

        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) throw new Error("Recipe not found");

        const userId = context.user?.id || null;

        const newComment = {
          text,
          user: userId,
          createdAt: new Date(),
        };

        recipe.comments.push(newComment);
        await recipe.save();

        const lastCommentIndex = recipe.comments.length - 1;

        const populatedRecipe = await RecipeModel.findById(recipeId).populate({
          path: `comments.${lastCommentIndex}.user`,
          model: "User", 
        });

        return populatedRecipe.comments[lastCommentIndex];
      } catch (error: any) {
        throw new Error(error.message || "Failed to add comment");
      }
    },
  },
};
