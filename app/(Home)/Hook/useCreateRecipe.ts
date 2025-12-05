"use client";

import { gql } from "@apollo/client";
import { RecipeInput } from "../types/recipe";
import { useMutation } from "@apollo/client/react";

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      id
      title
      description
      cuisine
      prepTime
      cookTime
      servings
      ingredients {
        name
        quantity
        unit
      }
      instructions
      image
    }
  }
`;

interface CreateRecipeResponse {
  createRecipe: {
    id: string;
    title: string;
    description: string;
    cuisine: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients: {
      name: string;
      quantity: number;
      unit: string;
    }[];
    instructions: string[];
    image: string;
  };
}

interface CreateRecipeVars {
  input: RecipeInput;
}

export const useCreateRecipe = () => {
  const [createRecipeMutation, { loading, error, data }] = 
  useMutation<CreateRecipeResponse, CreateRecipeVars>(CREATE_RECIPE);

  const createRecipe = async (input: RecipeInput) => {
    const response = await createRecipeMutation({ variables: { input } });
    return response.data!.createRecipe;
  };

  return { createRecipe, loading, error, data };
};
