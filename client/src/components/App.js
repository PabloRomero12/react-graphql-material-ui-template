import React from "react";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "80%"
  },
  rootGridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
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

          return (
            <div className={classes.rootGridList}>
              <GridList cols={4} cellHeight={180} className={classes.gridList}>
                <GridListTile
                  key="Subheader"
                  cols={4}
                  style={{ height: "auto" }}
                >
                  <ListSubheader component="div">Recipes</ListSubheader>
                </GridListTile>
                {data.getAllRecipes.map(recipe => (
                  <GridListTile key={recipe._id}>
                    <img src={recipe.picture} alt={recipe.name} />
                    <GridListTileBar
                      title={recipe.name}
                      subtitle={
                        <span>
                          <FavoriteIcon />
                          {recipe.likes}
                        </span>
                      }
                      actionIcon={
                        <IconButton
                          color="primary"
                          className={classes.icon}
                          onClick={() => {
                            props.history.push(`/recipes/${recipe._id}`);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
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
