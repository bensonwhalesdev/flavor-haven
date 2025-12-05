import gql from "graphql-tag";

export const typeDefs = gql`
  # ----------------------------
  # Types
  # ----------------------------
  type User {
    id: ID!
    firstname: String!
    email: String!
    role: String!
    postedRecipes: [Recipe!]!
    likedRecipes: [Recipe!]!
  }

  type Ingredient {
    name: String!
    quantity: Float!
    unit: String!
  }

  type Comment {
    id: ID!
    user: User
    text: String!
    createdAt: String!
  }

  type Recipe {
    id: ID!
    title: String!
    description: String!
    cuisine: String
    prepTime: Int
    cookTime: Int
    servings: Int
    ingredients: [Ingredient!]!
    instructions: [String!]!
    author: User!
    likes: [User!]!
    comments: [Comment!]!
    image: String
    createdAt: String!
    updatedAt: String!
  }

  #------Paginated Response Type ---
  type PaginatedRecipes {
    recipes: [Recipe!]!
    totalCount: Int!
    currentPage: Int!
    pageSize: Int!
    totalPages: Int!
  }
  # ------------------------------------

  type AuthPayload {
    user: User!
    token: String!
  }

  # ----------------------------
  # Inputs
  # ----------------------------
  input IngredientInput {
    name: String!
    quantity: Float!
    unit: String!
  }

  input RecipeInput {
    title: String!
    description: String!
    cuisine: String
    prepTime: Int
    cookTime: Int
    servings: Int
    ingredients: [IngredientInput!]!
    instructions: [String!]!
    image: String
  }

  input RegisterInput {
    firstname: String!
    email: String!
    password: String!
  }

  # ----------------------------
  # Queries
  # ----------------------------
  type Query {
    recipes(
      search: String
      cuisine: String
      page: Int
      pageSize: Int
    ): PaginatedRecipes!
    
    recipe(id: ID!): Recipe
    userRecipes(userId: ID!): [Recipe!]!
    users: [User!]!
    user(id: ID!): User
  }

  # ----------------------------
  # Mutations
  # ----------------------------
  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createRecipe(input: RecipeInput!): Recipe!
    toggleLike(recipeId: ID!): Recipe!
    addComment(recipeId: ID!, text: String!): Comment!
  }
`;