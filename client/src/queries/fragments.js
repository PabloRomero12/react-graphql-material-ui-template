import { gql } from "apollo-boost";

export const recipeFragments = {
  recipe: gql`
    fragment CompleteRecipe on Recipe {
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
  `,
  likes: gql`
    fragment CompleteLikes on Recipe {
      _id
      likes
    }
  `
};
