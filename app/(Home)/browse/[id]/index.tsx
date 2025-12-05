"use client";

import { gql } from "@apollo/client";
import { notFound, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card"; 
import { IoTimerOutline, IoFlameOutline, IoPeopleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { IoPersonOutline, IoChatbubblesOutline } from "react-icons/io5";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Recipe, RecipeResponse, Comment } from "./types/recipeTypes";
import { useRecipeInteractions } from "./Hooks/useRecipeInteractions";
import { useAuth } from "../../Hook/useAuth";
import { User } from "@/app/(auth)/Types/auth";


// --- Placeholder for current user ID (Replace with actual Auth context hook) ---
// const useCurrentUser = () => ({
//   // Dummy data: Replace 'c123' with the logged-in user's actual ID
//   // If the user is logged out, this should return null.
//   id: "c123", 
// });
// -------------------------------------------------------------------------------


const GET_RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      cuisine
      prepTime
      cookTime
      servings
      image
      ingredients {
        name
        quantity
        unit
      }
      instructions
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
      author { firstname }
    }
  }
`;

// --- Components ---

const LikeButton = ({ recipe, currentUserId, handleToggleLike }: { 
  recipe: Recipe, 
  currentUserId: string | null, 
  handleToggleLike: () => void 
}) => {
  const isLiked = recipe.likes.some(like => like.id === currentUserId);
  const likeCount = recipe.likes.length;
  const Icon = isLiked ? IoHeart : IoHeartOutline;

  return (
    <button
      onClick={handleToggleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
        isLiked
          ? "bg-[#CF470C] text-white border-[#CF470C] hover:bg-[#b93f0b]"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <Icon size={20} />
      <span className="font-semibold">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
};

const CommentSection = ({ recipeId, comments, handleAddComment, commentLoading }: {
  recipeId: string,
  comments: Comment[],
  handleAddComment: (text: string) => void,
  commentLoading: boolean
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddComment(commentText);
    setCommentText("");
  };

  return (
    <div className="mt-12 p-6 rounded-lg bg-white shadow-inner">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <IoChatbubblesOutline size={24} /> Comments ({comments.length})
      </h3>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your thoughts on this recipe..."
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#CF470C] mb-2"
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={commentLoading}
          className="px-6 py-2 bg-[#CF470C] text-white rounded-lg font-semibold hover:bg-[#b93f0b] transition duration-150 disabled:opacity-50"
        >
          {commentLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-3 bg-white border rounded-lg shadow-sm">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-800 flex items-center gap-1">
                  <IoPersonOutline size={14} />
                  {comment.user ? comment.user.firstname : "Anonymous"}
                </span>
                {/* <span>{new Date(comment.createdAt).toLocaleDateString()}</span> */}
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


// --- Main Component ---

export default function RecipePage() {
  const { id } = useParams();
 const { user }: { user: User | null } = useAuth();
  const currentUserId: string | null = user ? user.id : null

  const { data, loading } = useQuery<RecipeResponse>(GET_RECIPE, {
    variables: { id },
  });

  const { handleToggleLike, handleAddComment, commentLoading } = useRecipeInteractions(id as string, currentUserId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-[#CF470C]/10 py-16 px-6 space-y-6">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-6 w-1/5" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data?.recipe) return notFound();

  const r = data.recipe;

  return (
    <div className="min-h-screen pb-20">
      
      {/* Recipe Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title and Header Section */}
        <div className="pt-8 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {r.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mt-2 mb-6">
            {r.description}
          </p>

          {/* Recipe Meta Info Row (Prep, Cook, Servings, Author) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-700 text-sm font-medium border-y py-3 mb-6">
            <div className="flex items-center gap-2">
              <IoTimerOutline size={20} className="text-[#CF470C]" />
              <span>Prep: {r.prepTime || '-'}m</span>
            </div>
            <div className="flex items-center gap-2">
              <IoFlameOutline size={20} className="text-[#CF470C]" />
              <span>Cook: {r.cookTime || '-'}m</span>
            </div>
            <div className="flex items-center gap-2">
              <IoPeopleOutline size={20} className="text-[#CF470C]" />
              <span>Servings: {r.servings || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <IoPersonOutline size={20} className="text-[#CF470C]" />
              <span>Recipe Author: <span className="font-bold">{r.author.firstname}</span></span>
            </div>
          </div>
        </div>

        {/* Image and Interaction Row */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          
          {/* Recipe Image (Wider on mobile, 2/3 on desktop) */}
          <div className="w-full md:w-2/3 h-80 sm:h-96 overflow-hidden rounded-xl shadow-lg">
            <img
              src={r.image || "/fallback-food.jpg"}
              alt={r.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author and Like Button (Narrower on mobile, 1/3 on desktop) */}
          <div className="w-full md:w-1/3 flex flex-col items-start gap-4 p-4 bg-gray-50 rounded-xl shadow-md">
            
            {/* Author Card (Matching the design image style) */}
            <div className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm w-full">
              <div className="w-10 h-10 rounded-full bg-[#CF470C]/20 flex items-center justify-center text-[#CF470C] text-xl font-bold">
                {r.author.firstname[0].toUpperCase()}
              </div>
              <div>
                <span className="text-sm text-gray-500">Recipe Author</span>
                <p className="font-semibold text-lg text-gray-800">{r.author.firstname}</p>
              </div>
            </div>

            {/* Like Button */}
            <LikeButton 
              recipe={r} 
              currentUserId={currentUserId} 
              handleToggleLike={handleToggleLike} 
            />

          </div>
        </div>


        {/* Ingredients and Instructions FLEX SECTION */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Ingredients Column (Wider on desktop, 1/2) */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <Card className="p-6 shadow-xl border-t-4 border-t-[#CF470C] bg-white rounded-xl">
              <ul className="space-y-3">
                {r.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between text-gray-700 border-b pb-2 last:border-b-0 last:pb-0">
                    <span>{ing.quantity} {ing.unit} <span className="font-semibold">{ing.name}</span></span>
                    
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          {/* Instructions Column (Wider on desktop, 1/2) */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
            <Card className="p-6 shadow-xl border-t-4 border-t-[#CF470C] bg-white rounded-xl">
              <ol className="list-none space-y-6 text-gray-700">
                {r.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CF470C] text-white font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </div>
                    <p className="flex-1 leading-relaxed border-b pb-4 last:border-b-0">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>

        {/* Comment Box (Below Ingredients and Instructions) */}
        <CommentSection 
          recipeId={r.id} 
          comments={r.comments} 
          handleAddComment={handleAddComment}
          commentLoading={commentLoading}
        />

      </div>
    </div>
  );
}