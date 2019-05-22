import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Signout from "../Auth/Signout";

import { NavLink } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const NavbarUnAuth = () => (
  <div>
    <Button component={NavLink} to="/" color="inherit">
      Home
    </Button>
    <Button component={NavLink} to="/search" color="inherit">
      Search
    </Button>
    <Button component={NavLink} to="/signup" color="inherit">
      Sign Up
    </Button>

    <Button component={NavLink} to="/signin" color="inherit">
      Sign In
    </Button>
  </div>
);

const NavbarAuth = ({ session }) => (
  <div>
    <Button component={NavLink} to="/" color="inherit">
      Home
    </Button>

    <Button component={NavLink} to="/search" color="inherit">
      Search
    </Button>

    <Button component={NavLink} to="/recipe/add" color="inherit">
      Search
    </Button>

    <Button component={NavLink} to="/profile" color="inherit">
      Profile
    </Button>

    <Signout />

    <Typography color="secondary">
      Welcome, {session.getCurrentUser.username}
    </Typography>
  </div>
);

const Navbar = props => {
  const { classes, session } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Recipes
          </Typography>
          {session && session.getCurrentUser ? (
            <NavbarAuth session={session} />
          ) : (
            <NavbarUnAuth />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
