export const RECIPES_PER_PAGE = 6;

export const CUISINES = [
    "Mexican",
    "Italian",
    "American",
    "Chinese",
    "Japanese",
    "African",
    "West African",
    "British",
    "Spanish",
    "Indian",
    "Korean",
    "Thai",
    "Mediterranean",
];

export type User = {
    id: string;
    firstname: string;
};

export type Recipe = {
    id: string;
    title: string;
    description: string;
    cuisine?: string;
    image?: string;
    likes: { id: string }[];
    author: User;
};

export type PaginatedRecipesResult = {
    recipes: Recipe[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
};

export type RecipesQueryResult = {
    recipes: PaginatedRecipesResult;
};