import React from "react";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";

import List from "@material-ui/core/List";

import RecipeItem from "./Recipe/RecipeItem";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

function App(props) {
  const { classes } = props;
  return (
    <div className="App">
      <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
          if (loading) return <h1>LOADING ...</h1>;
          if (error) return <h1>ERROR</h1>;

          console.log(data);
          return (
            <List className={classes.root}>
              {data.getAllRecipes.map(recipe => (
                <RecipeItem key={recipe._id} recipe={recipe} />
              ))}
            </List>
          );
        }}
      </Query>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
