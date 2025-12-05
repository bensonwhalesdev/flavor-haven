import { authResolvers } from "./auth.resolver";
import { recipeResolvers } from "./recipe.resolver";
import { userResolvers } from "./user.resolver";


export const resolvers = [ authResolvers, recipeResolvers, userResolvers ];