import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

import Search from "./components/Recipe/Search";
import AddRecipe from "./components/Recipe/AddRecipe";
import Profile from "./components/Profile/Profile";
import RecipePage from "./components/Recipe/RecipePage";

import Navbar from "./components/Template/Navbar";

import withSession from "./components/withSession";
import * as serviceWorker from "./serviceWorker";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://recipes-tutorial.herokuapp.com/graphql",
  fetchOptions: {
    credentials: "include"
  },
  cache,
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);

      if (networkError.statusCode === 401) {
        localStorage.removeItem("token");
      }
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/search" render={() => <Search refetch={refetch} />} />
        <Route
          path="/recipe/add"
          render={() => <AddRecipe refetch={refetch} session={session} />}
        />
        <Route
          path="/recipes/:_id"
          render={() => <RecipePage refetch={refetch} />}
        />
        <Route
          path="/profile"
          render={() => <Profile refetch={refetch} session={session} />}
        />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
