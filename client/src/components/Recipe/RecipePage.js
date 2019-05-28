import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import { GET_RECIPE } from "../../queries";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(2)
  },
  card: {
    maxWidth: "400"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const formatDate = date => {
  date = parseInt(date);
  const newDate = new Date(date).toLocaleDateString();
  const newTime = new Date(date).toLocaleTimeString();
  return `${newDate} at ${newTime}`;
};

class RecipePage extends React.Component {
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { match, classes } = this.props;

    return (
      <Query query={GET_RECIPE} variables={{ _id: match.params._id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;

          const { getRecipe } = data;
          return (
            <div className={classes.root}>
              <Grid container spacing={4}>
                <Grid item xs={false} md={2} />
                <Grid item xs={12} md={5}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        {getRecipe.name[0]}
                      </Avatar>
                      <span>
                        <Typography variant="h4">{getRecipe.name}</Typography>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        className={classes.media}
                        image={getRecipe.picture}
                        title={getRecipe.name}
                      />
                      <Typography component="p">
                        {getRecipe.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {`Created by: ${getRecipe.username}`}
                      </Typography>
                      <Typography variant="subtitle2">
                        {`Create at: ${formatDate(getRecipe.createdDate)}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Share">
                        <ShareIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="h6">Instructions:</Typography>
                  <Typography paragraph>{getRecipe.instructions}</Typography>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

RecipePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RecipePage));
