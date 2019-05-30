import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Query, Mutation } from "react-apollo";

import {
  GET_RECIPES_BY_USER,
  DELETE_USER_RECIPE,
  GET_CURRENT_USER,
  GET_ALL_RECIPES
} from "../../queries";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";

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

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this recipe?"
  );
  if (confirmDelete) {
    deleteUserRecipe()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }
};

const UserRecipes = props => {
  const { classes, session } = props;

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
              {!data.getRecipesByUser.length ? (
                <Typography variant="h6">
                  You have not added any recipe yet!
                </Typography>
              ) : null}
              {data.getRecipesByUser.map(recipe => (
                <GridListTile key={recipe._id}>
                  <img src={recipe.picture} alt={recipe.name} />
                  <GridListTileBar
                    key={recipe._id}
                    title={recipe.name}
                    subtitle={
                      <span>
                        <FavoriteIcon />
                        {recipe.likes}
                      </span>
                    }
                    actionIcon={[
                      <Mutation
                        key={recipe._id}
                        mutation={DELETE_USER_RECIPE}
                        variables={{
                          _id: recipe._id,
                          username: session.getCurrentUser.username
                        }}
                        refetchQueries={() => [
                          { query: GET_ALL_RECIPES },
                          { query: GET_CURRENT_USER }
                        ]}
                        update={(proxy, { data: { deleteUserRecipe } }) => {
                          const { getRecipesByUser } = proxy.readQuery({
                            query: GET_RECIPES_BY_USER
                          });

                          proxy.writeQuery({
                            query: GET_RECIPES_BY_USER,
                            data: {
                              getRecipesByUser: getRecipesByUser.filter(
                                r => r._id !== deleteUserRecipe._id
                              )
                            }
                          });
                        }}
                      >
                        {(deleteUserRecipe, attrs) => (
                          <IconButton
                            color="primary"
                            className={classes.icon}
                            onClick={() => {
                              handleDelete(deleteUserRecipe);
                            }}
                          >
                            {!attrs.loading ? <DeleteForeverIcon /> : null}
                          </IconButton>
                        )}
                      </Mutation>,
                      <IconButton
                        key={recipe._id + "info"}
                        color="primary"
                        className={classes.icon}
                        onClick={() => {
                          props.history.push(`/recipes/${recipe._id}`);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    ]}
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
