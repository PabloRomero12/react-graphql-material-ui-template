import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { ApolloConsumer } from "react-apollo";

import { SEARCH_RECIPES } from "../../queries";

const styles = theme => ({
  rootSearch: {
    backgroundColor: "#aaa"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    justifyContent: "center"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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

class Search extends React.Component {
  state = {
    searchRecipes: []
  };

  handleChange = data => {
    const { searchRecipes } = data;
    this.setState({ searchRecipes });
  };

  render() {
    const { classes } = this.props;
    const { searchRecipes } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div>
              <div className={classes.rootSearch}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={async event => {
                      event.persist();
                      const { data } = await client.query({
                        query: SEARCH_RECIPES,
                        variables: { searchTerm: event.target.value }
                      });

                      this.handleChange(data);
                    }}
                  />
                </div>
              </div>
              <div className={classes.rootGridList}>
                <GridList
                  cols={4}
                  cellHeight={180}
                  className={classes.gridList}
                >
                  <GridListTile
                    key="Subheader"
                    cols={4}
                    style={{ height: "auto" }}
                  >
                    <ListSubheader component="div">Recipes Found</ListSubheader>
                  </GridListTile>
                  {searchRecipes.map(recipe => (
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
                            className={classes.icon}
                            onClick={() => {
                              this.props.history.push(`/recipes/${recipe._id}`);
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
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Search));
