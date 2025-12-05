import { useState, useMemo } from "react";
import { gql } from "@apollo/client";
import { RECIPES_PER_PAGE, RecipesQueryResult } from "../Types/browseRecipe";
import { useQuery } from "@apollo/client/react";


const shuffleArray = <T>(array: T[], seed: number): T[] => {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let randomIndex;

  let prng = (seed % 2147483647); 
  if (prng <= 0) prng += 2147483646;

  const nextRandom = () => {
    prng = (prng * 1664525 + 1013904223) % 4294967296; 
    return prng / 4294967296; 
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(nextRandom() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
};


const GET_PAGINATED_RECIPES = gql`
  query PaginatedRecipes(
    $page: Int!
    $pageSize: Int!
    $search: String
    $cuisine: String
  ) {
    recipes(
      page: $page
      pageSize: $pageSize
      search: $search
      cuisine: $cuisine
    ) {
      recipes {
        id
        title
        description
        cuisine
        image
        likes {
          id
        }
        author {
          firstname
        }
      }
      totalCount
      currentPage
      pageSize
      totalPages
    }
  }
`;

export const useBrowseRecipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [randomSeed] = useState(() => Date.now()); 

  const { data, loading, error } = useQuery<RecipesQueryResult>(
    GET_PAGINATED_RECIPES,
    {
      variables: {
        page: currentPage,
        pageSize: RECIPES_PER_PAGE,
        search: searchQuery || undefined,
        cuisine: cuisineFilter || undefined,
      },
    }
  );

  const paginatedData = data?.recipes;
  
  const fetchedRecipes = paginatedData?.recipes || [];
  const totalPages = paginatedData?.totalPages || 1;
  const totalCount = paginatedData?.totalCount || 0;

  const displayedRecipes = useMemo(() => {
    if (fetchedRecipes.length === 0) return [];

    return shuffleArray(fetchedRecipes, randomSeed);
  }, [fetchedRecipes, randomSeed]); 

  // --- Handlers ---
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Resets page when filters change
  const handleFilterChange = (newCuisine: string) => {
    setCuisineFilter(newCuisine);
    setCurrentPage(1);
  };

  // Resets page when search query changes
  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
  };

  return {
    searchQuery,
    cuisineFilter,
    currentPage,
    displayedRecipes,
    totalPages,
    totalCount,
    loading,
    error,
    handlePageChange,
    handleFilterChange,
    handleSearchChange,
  };
};