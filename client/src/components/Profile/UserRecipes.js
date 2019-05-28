import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Query } from "react-apollo";

import { GET_RECIPES_BY_USER } from "../../queries";

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

const UserRecipes = props => {
  const { classes } = props;

  return (
    <Query query={GET_RECIPES_BY_USER}>
      {({ data, loading, error }) => {
        if (loading) return <h1>LOADING ...</h1>;
        if (error) return <h1>ERROR</h1>;

        return (
          <div className={classes.rootGridList}>
            <GridList cols={4} cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                <ListSubheader component="div">Recipes</ListSubheader>
              </GridListTile>
              {data.getRecipesByUser.map(recipe => (
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
  );
};

UserRecipes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(UserRecipes));
