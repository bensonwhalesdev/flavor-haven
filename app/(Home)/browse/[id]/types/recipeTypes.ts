export type Author = {
  firstname: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type CommentUser = {
  id: string;
  firstname: string;
};

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  user: CommentUser | null; // Null if posted by Anonymous/Guest
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  cuisine: string | null;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  image: string | null;
  ingredients: Ingredient[];
  instructions: string[];
  likes: { id: string }[];
  comments: Comment[];
  author: Author;
};

export type RecipeResponse = {
  recipe: Recipe;
};

