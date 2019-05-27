import { gql } from "apollo-boost";

/* RECIPES QUERIES */

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
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
    }
  }
`;

/* USERS QUERIES */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinedDate
      email
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

export const GET_RECIPE = gql`
  query($_id: ID) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      picture
      createdDate
      likes
      username
    }
  }
`;
