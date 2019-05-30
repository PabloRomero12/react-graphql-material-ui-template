const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
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

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token !== "null") {
    try {
      const currentUser = jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }

  next();
});

// Connect schemas to GraphQL
app.use(
  "/graphql",
  graphqlHTTP(({ currentUser }) => ({
    schema: schema,
    graphiql: true,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
