// src/hooks/useRecipeInteractions.ts

import { gql } from "@apollo/client";
import { toast } from "sonner";
import { RecipeResponse, Comment } from "../types/recipeTypes";
import { useMutation } from "@apollo/client/react";

type ToggleLikeMutationResult = {
  toggleLike: {
    id: string;
    likes: { id: string }[];
  };
};

type AddCommentMutationResult = {
  addComment: Comment;
};

// --- Mutations ---
const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($recipeId: ID!) {
    toggleLike(recipeId: $recipeId) {
      id
      likes {
        id
      }
    }
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($recipeId: ID!, $text: String!) {
    addComment(recipeId: $recipeId, text: $text) {
      id
      text
      createdAt
      user {
        id
        firstname
      }
    }
  }
`;

// --- Hook ---
export const useRecipeInteractions = (recipeId: string, currentUserId: string | null) => {

  const [toggleLikeMutate] = useMutation<ToggleLikeMutationResult>(TOGGLE_LIKE_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
    
    update(cache, { data }) {
      const newRecipe = data?.toggleLike; 
      
      const cachedRecipe = cache.readQuery<RecipeResponse>({
        query: GET_RECIPE,
        variables: { id: recipeId },
      });

      if (cachedRecipe && newRecipe?.likes) {
        const { recipe } = cachedRecipe;
        cache.writeQuery({
          query: GET_RECIPE,
          variables: { id: recipeId },
          data: {
            recipe: {
              ...recipe,
              likes: newRecipe.likes,
            },
          },
        });
      }
    },
  });

  const handleToggleLike = () => {
    if (!currentUserId) {
      toast.error("You must be logged in to like a recipe.");
      return;
    }
    toggleLikeMutate({ variables: { recipeId } });
  };

  // --- Comment Logic ---
  const [addCommentMutate, { loading: commentLoading }] = useMutation<AddCommentMutationResult>(ADD_COMMENT_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
    
    update(cache, { data }) {
      const newComment = data?.addComment;
      
      const cachedRecipe = cache.readQuery<RecipeResponse>({
        query: GET_RECIPE,
        variables: { id: recipeId },
      });

      if (cachedRecipe && newComment) {
        const { recipe } = cachedRecipe;
        cache.writeQuery({
          query: GET_RECIPE,
          variables: { id: recipeId },
          data: {
            recipe: {
              ...recipe,
              comments: [...recipe.comments, newComment],
            },
          },
        });
      }
    },
  });

  const handleAddComment = (text: string) => {
    if (!text.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    addCommentMutate({ variables: { recipeId, text } });
  };

  return {
    handleToggleLike,
    handleAddComment,
    commentLoading,
  };
};

const GET_RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      likes { id }
      comments {
        id
        text
        createdAt
        user {
          id
          firstname
        }
      }
    }
  }
`;