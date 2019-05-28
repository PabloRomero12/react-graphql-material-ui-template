import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({});

const RecipeItem = props => {
  const { recipe, classes } = props;

  return (
    <GridListTile>
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
  );
};

RecipeItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RecipeItem));
