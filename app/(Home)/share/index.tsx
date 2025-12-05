"use client";

import { useState } from "react";
import { useCreateRecipe } from "../Hook/useCreateRecipe";
import { IngredientInput, RecipeInput } from "../types/recipe";
import Link from "next/link";
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ShareRecipePage = () => {
  const router = useRouter();
  const { createRecipe, loading } = useCreateRecipe();

  // --- Step 1: Basic Info ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState<number | "">("");
  const [cookTime, setCookTime] = useState<number | "">("");
  const [servings, setServings] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);

  // --- Step 2: Ingredients ---
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: "", quantity: 0, unit: "" },
  ]);

  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);

  const updateIngredient = ( index: number, field: keyof IngredientInput,value: IngredientInput[typeof field] ) => { setIngredients((prev) => {
    const updated = [...prev];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    return updated;
  });
};

  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  // --- Step 3: Instructions ---
  const [instructions, setInstructions] = useState<string[]>([""]);

  const addInstruction = () => setInstructions([...instructions, ""]);

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const removeInstruction = (index: number) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  // --- Submit Logic ---
  const handleSubmit = async () => {
    let imageUrl = "";

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        imageUrl = reader.result as string;
        await submitRecipe(imageUrl);
      };
    } else {
      await submitRecipe(imageUrl);
    }
  };

  const submitRecipe = async (imageUrl: string) => {
    const recipeInput: RecipeInput = {
      title,
      description,
      cuisine,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      ingredients,
      instructions,
      image: imageUrl,
    };

    try {
      const recipe = await createRecipe(recipeInput);

      toast.success(`Recipe "${recipe.title}" created successfully!`);

      setTimeout(() => {
        router.push("/browse");
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || "Error creating recipe");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <Link
          href="/browse"
          className="flex items-center gap-1 text-[#CF470C] hover:underline cursor-pointer text-sm sm:text-base"
        >
          <IoIosArrowBack size={20} />
          Back to recipes
        </Link>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Share Your Recipe</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Share your culinary creation with the community
          </p>
        </div>
      </div>

      {/* --- Part 1: Basic Info --- */}
      <div className="border p-4 sm:p-6 rounded-md bg-white shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-[#CF470C]">Basic Info</h2>

        <input
          type="text"
          placeholder="Recipe Title"
          className="w-full p-3 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-md min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cuisine"
          className="w-full p-3 border rounded-md"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Servings"
            className="p-3 border rounded-md"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Prep Time (min)"
            className="p-3 border rounded-md"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Cook Time (min)"
            className="p-3 border rounded-md col-span-2 md:col-span-1"
            value={cookTime}
            onChange={(e) => setCookTime(Number(e.target.value))}
          />
        </div>

        {/* Upload */}
        <label className="w-full p-3 border rounded-md flex items-center gap-2 cursor-pointer bg-gray-50 text-sm sm:text-base">
          <IoMdCloudUpload size={22} className="text-gray-700" />
          <span className="text-gray-700 truncate">
            {image ? image.name : "Upload Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* --- Part 2: Ingredients --- */}
      <div className="border p-4 sm:p-6 rounded-md bg-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-semibold text-[#CF470C]">Ingredients</h2>

          <button
            onClick={addIngredient}
            className="px-4 py-2 bg-[#CF470C] text-white rounded-md hover:bg-[#b93f0b] cursor-pointer w-full sm:w-auto text-sm"
          >
            Add Ingredient
          </button>
        </div>

        {ingredients.map((ing, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 items-end sm:items-center border-t pt-4 sm:pt-0 sm:border-t-0">
            <input
              type="text"
              placeholder="Ingredient"
              className="flex-1 w-full p-3 border rounded-md"
              value={ing.name}
              onChange={(e) => updateIngredient(i, "name", e.target.value)}
            />
            
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="number"
                placeholder="Qty"
                className="w-1/3 sm:w-20 p-3 border rounded-md"
                value={ing.quantity}
                onChange={(e) =>
                  updateIngredient(i, "quantity", Number(e.target.value))
                }
              />

              <input
                type="text"
                placeholder="Unit"
                className="w-1/3 sm:w-20 p-3 border rounded-md"
                value={ing.unit}
                onChange={(e) => updateIngredient(i, "unit", e.target.value)}
              />
              
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(i)}
                  className="w-1/3 sm:w-auto px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer h-full self-stretch flex items-center justify-center text-sm"
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- Part 3: Instructions --- */}
      <div className="border p-4 sm:p-6 rounded-md bg-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-semibold text-[#CF470C]">Instructions</h2>

          <button
            onClick={addInstruction}
            className="px-4 py-2 bg-[#CF470C] text-white rounded-md hover:bg-[#b93f0b] cursor-pointer w-full sm:w-auto text-sm"
          >
            Add Step
          </button>
        </div>

        {instructions.map((inst, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 items-end sm:items-start border-t pt-4 sm:pt-0 sm:border-t-0">
            <textarea
              placeholder={`Step ${i + 1}`}
              className="flex-1 w-full p-3 border rounded-md min-h-[80px]"
              value={inst}
              onChange={(e) => updateInstruction(i, e.target.value)}
            />

            {instructions.length > 1 && (
              <button
                onClick={() => removeInstruction(i)}
                className="w-full sm:w-auto px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer self-end sm:self-auto text-sm"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-[#CF470C] text-white rounded-md hover:bg-[#b93f0b] cursor-pointer w-full sm:w-auto text-lg font-semibold transition duration-150"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Recipe"}
      </button>
    </div>
  );
};

export default ShareRecipePage;