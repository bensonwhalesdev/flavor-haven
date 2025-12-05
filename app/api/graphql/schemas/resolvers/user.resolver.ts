import RecipeModel from "@/app/api/models/recipe.model";
import UserModel from "@/app/api/models/user.model";
import { connectDB } from "@/app/utils/connectdb";


export const userResolvers = {
  Query: {
    users: async () => {
      try {
        await connectDB();
        return await UserModel.find();
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch users");
      }
    },

    user: async (_: any, { id }: any) => {
      try {
        await connectDB();
        return await UserModel.findById(id)
          .populate("postedRecipes")
          .populate("likedRecipes");
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch user");
      }
    },
  },

  User: {
    postedRecipes: async (parent: any) => {
      try {
        await connectDB();
        return await RecipeModel.find({ author: parent._id });
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch posted recipes");
      }
    },
    likedRecipes: async (parent: any) => {
      try {
        await connectDB();
        return await RecipeModel.find({ _id: { $in: parent.likedRecipes } });
      } catch (error: any) {
        throw new Error(error.message || "Failed to fetch liked recipes");
      }
    },
  },
};
