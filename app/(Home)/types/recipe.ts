export interface IngredientInput {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeInput {
  title: string;
  description: string;
  cuisine?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients: IngredientInput[];
  instructions: string[];
  image?: string;
}
