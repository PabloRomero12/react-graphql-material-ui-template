import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: theme.spacing(2)
  }
});

const formatDate = date => {
  date = parseInt(date);
  const newDate = new Date(date).toLocaleDateString();
  const newTime = new Date(date).toLocaleTimeString();
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ classes, session: { getCurrentUser } }) => (
  <Grid className={classes.root} container spacing={2}>
    <Grid item xs={false} md={2} />
    <Grid item xs={12} md={4}>
      <Typography variant="h4">USER INFO</Typography>
      <Typography variant="body2">{getCurrentUser.username}</Typography>
      <Typography variant="body2">{getCurrentUser.email}</Typography>
      <Typography variant="body2">
        {formatDate(getCurrentUser.joinedDate)}
      </Typography>
    </Grid>
    <Grid item xs={12} md={4}>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            {getCurrentUser.username}'s favorites
          </ListSubheader>
        }
        className={classes.root}
      >
        {getCurrentUser.favorites.map(fav => (
          <ListItem>{fav.name}</ListItem>
        ))}
      </List>
      {!getCurrentUser.favorites.length && (
        <Typography variant="h6">
          You have no favorites currently. Go add some!
        </Typography>
      )}
    </Grid>
    <Grid item xs={false} md={2} />
  </Grid>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserInfo);
