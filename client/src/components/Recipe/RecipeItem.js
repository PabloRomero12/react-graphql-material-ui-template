import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const RecipeItem = props => {
  const { recipe } = props;

  return (
    <ListItem
      onClick={() => {
        props.history.push(`/recipes/${recipe._id}`);
      }}
    >
      <Avatar>
        <ImageIcon />
      </Avatar>
      <ListItemText primary={recipe.name} secondary={recipe.category} />
    </ListItem>
  );
};

RecipeItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RecipeItem));
