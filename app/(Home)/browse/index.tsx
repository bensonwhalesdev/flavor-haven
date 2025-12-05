"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuChefHat } from "react-icons/lu";
import { IoChevronBack, IoChevronForward, IoSearch } from "react-icons/io5";
import { useBrowseRecipes } from "./Hooks/useBrowseRecipe";
import { CUISINES, RECIPES_PER_PAGE } from "./Types/browseRecipe";
import Image from "next/image";


export default function BrowsePage() {
  const {
    searchQuery,
    cuisineFilter,
    currentPage,
    displayedRecipes,
    totalPages,
    loading,
    handlePageChange,
    handleFilterChange,
    handleSearchChange,
  } = useBrowseRecipes();
  
  const cuisinesWithAll = ["", ...CUISINES];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Title and Description */}
        <h1 className="text-4xl font-extrabold text-[#CF470C] mb-2">
          Discover Recipes
        </h1>
        <p className="text-gray-600 mb-10 max-w-xl">
          Explore thousands of delicious recipes from around the world.
        </p>

        {/* --- Search and Filter Bar --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Search Input */}
          <div className="relative flex-1">
            <IoSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ingredients, recipes, or cuisines..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CF470C] focus:border-transparent transition-colors"
            />
          </div>

          {/* Cuisine Select */}
          <select
            value={cuisineFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#CF470C] focus:border-transparent transition-colors md:w-48 appearance-none"
          >
            {cuisinesWithAll.map((cuisine) => (
              <option className="rounded" key={cuisine} value={cuisine}>
                {cuisine || "All Cuisines"}
              </option>
            ))}
          </select>

          {/* Share Recipe Button (Placeholder) */}
          <Link href={"/share"}>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#CF470C] text-white rounded-lg font-semibold hover:bg-[#b93f0b] transition duration-150 shadow-md md:w-auto">
              <LuChefHat size={20} /> Share Recipe
            </button>
          </Link>
        </div>

        {/* --- Recipe Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loading Skeletons */}
          {loading &&
            [...Array(RECIPES_PER_PAGE)].map((_, i) => (
              <Card key={i} className="rounded-xl overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}

          {/* Data */}
          {!loading &&
            displayedRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/browse/${recipe.id}`}>
                <Card className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="h-48 w-full bg-gray-200">
                    <Image
                      loading="lazy" 
                      width={100}
                      height={100}
                      src={recipe.image || "/fallback-food.jpg"}
                      alt={recipe.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardContent className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                        {recipe.title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
                        {recipe.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        {recipe.cuisine || "General"}
                      </span>
                      <span className="text-gray-500 font-medium">
                        ❤️ {recipe.likes.length} Likes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

          {/* No Results Message */}
          {!loading && displayedRecipes.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              <p className="text-lg font-semibold">
                😔 No recipes found matching your criteria.
              </p>
              <p className="mt-2">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>

        {/* --- Pagination Controls --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
              aria-label="Previous Page"
            >
              <IoChevronBack size={20} />
            </button>

            <span className="text-lg font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
              aria-label="Next Page"
            >
              <IoChevronForward size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}