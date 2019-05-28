import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import Error from "../Auth/Error";
import withAuth from "../withAuth";

import { Mutation } from "react-apollo";

import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_RECIPES_BY_USER
} from "../../queries";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2 * 2))]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  picture: {
    width: "100%"
  }
});

const initialState = {
  category: "",
  name: "",
  picture: "",
  description: "",
  instructions: "",
  username: ""
};

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  componentDidMount() {
    const { getCurrentUser } = this.props.session;
    if (getCurrentUser) {
      this.setState({ username: getCurrentUser.username });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    const { name, category, instructions, description } = this.state;

    const isInvalid = !name || !category || !instructions || !description;

    return isInvalid;
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();

    addRecipe()
      .then(({ data }) => {
        this.clearInputs();
        //this.props.history.push(`/recipes/${data.addRecipe._id}`);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  clearInputs = () => {
    this.setState({ ...initialState });
  };

  updateCache = (proxy, { data: { addRecipe } }) => {
    try {
      const { getAllRecipes } = proxy.readQuery({ query: GET_ALL_RECIPES });

      proxy.writeQuery({
        query: GET_ALL_RECIPES,
        data: {
          getAllRecipes: [addRecipe, ...getAllRecipes]
        }
      });
    } catch (err) {
      console.log("not in cache");
    }

    try {
      const { getRecipesByUser } = proxy.readQuery({
        query: GET_RECIPES_BY_USER
      });
      proxy.writeQuery({
        query: GET_RECIPES_BY_USER,
        data: {
          getRecipesByUser: [addRecipe, ...getRecipesByUser]
        }
      });
    } catch (err) {
      console.log("not in cache");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Mutation
            mutation={ADD_RECIPE}
            variables={{
              username: this.state.username,
              name: this.state.name,
              description: this.state.description,
              picture: this.state.picture,
              category: this.state.category,
              instructions: this.state.instructions
            }}
            update={this.updateCache}
          >
            {(addRecipe, { data, loading, error }) => {
              return (
                <form onSubmit={event => this.handleSubmit(event, addRecipe)}>
                  <Typography variant="h3" gutterBottom>
                    Add Recipe
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl className={classes.formControl} required>
                        <InputLabel htmlFor="age-simple">Category</InputLabel>
                        <Select
                          value={this.state.category}
                          onChange={this.handleChange}
                          inputProps={{
                            name: "category",
                            id: "category"
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"grill"}>Grill</MenuItem>
                          <MenuItem value={"soup"}>Soup</MenuItem>
                          <MenuItem value={"desert"}>Desert</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rowsMax="4"
                        value={this.state.description}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item md={9} xs={12}>
                      <TextField
                        id="picture"
                        name="picture"
                        label="Image URL"
                        fullWidth
                        autoComplete="picture"
                        value={this.state.picture}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      {this.state.picture ? (
                        <img
                          src={this.state.picture}
                          alt="finished recipe"
                          className={classes.picture}
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="instructions"
                        name="instructions"
                        label="Add Instructions"
                        multiline
                        rowsMax="4"
                        value={this.state.instructions}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      disabled={loading || this.validateForm()}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                  {error && <Error error={error} />}
                </form>
              );
            }}
          </Mutation>
        </Paper>
      </main>
    );
  }
}

AddRecipe.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(withStyles(styles)(AddRecipe))
);
