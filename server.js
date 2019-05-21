const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring graphql
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Connects to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(err => console.log(err));

// Initialize application

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// Connect schemas to GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
