import { gql } from "apollo-boost";
import { recipeFragments } from "./fragments";

/* RECIPES QUERIES */

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      likes
      picture
      description
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      description
      picture
      likes
    }
  }
`;

export const GET_RECIPES_BY_USER = gql`
  query {
    getRecipesByUser {
      _id
      name
      description
      picture
      likes
    }
  }
`;

/* RECIPES MUTATIONS */
export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $picture: String
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      picture: $picture
      username: $username
    ) {
      _id
      name
      category
    }
  }
`;

export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    deleteUserRecipe(_id: $_id, username: $username) {
      _id
      name
      description
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      ...CompleteLikes
    }
  }
  ${recipeFragments.likes}
`;

export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      ...CompleteLikes
    }
  }
  ${recipeFragments.likes}
`;

/* USERS QUERIES */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinedDate
      email
      favorites {
        _id
        name
      }
    }
  }
`;

/* USERS MUTATIONS */
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
