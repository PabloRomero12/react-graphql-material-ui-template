import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";

import { SIGNUP_USER } from "../../queries";

import Error from "./Error";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const initialState = {
  username: "",
  email: "",
  password: "",
  password2: ""
};

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();

    signupUser()
      .then(data => {
        console.log(data);
        this.clearInputs();
        this.props.history.push("/signin");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  clearInputs = () => {
    this.setState({
      ...initialState
    });
  };

  validateForm = () => {
    const { username, email, password, password2 } = this.state;

    const isInvalid =
      !username || !email || !password || password !== password2;

    return isInvalid;
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <form
                  className={classes.form}
                  onSubmit={event => {
                    this.handleSubmit(event, signupUser);
                  }}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      id="username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password2">
                      Password Confirmation
                    </InputLabel>
                    <Input
                      name="password2"
                      type="password"
                      id="password2"
                      autoComplete="confirm-password"
                      value={this.state.password2}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading || this.validateForm()}
                  >
                    Sign up
                  </Button>

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

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Signup));
