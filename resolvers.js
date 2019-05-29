const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find();
      return allRecipes;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Recipe"
      });

      return user;
    },

    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });

        return searchResults;
      } else {
        const recipes = await Recipe.find().sort({
          likes: -1,
          createdDate: -1
        });
        return recipes;
      }
    },

    getRecipesByUser: async (root, {}, { Recipe, currentUser }) => {
      if (currentUser) {
        const foundRecipes = await Recipe.find({
          username: currentUser.username
        });
        return foundRecipes;
      }

      throw new Error("not logged user");
    }
  },
  Mutation: {
    addRecipe: async (
      parent,
      { name, description, category, picture, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        picture,
        instructions,
        username
      }).save();

      return newRecipe;
    },
    deleteUserRecipe: async (
      parent,
      { _id, username },
      { Recipe, currentUser }
    ) => {
      if (currentUser.username === username) {
        const deleteRecipe = await Recipe.findOneAndRemove({ _id });

        return deleteRecipe;
      }

      throw new Error("User not authenticated");
    },

    signupUser: async (parent, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (parent, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      return { token: createToken(user, process.env.SECRET, "1hr") };
    }
  }
};
