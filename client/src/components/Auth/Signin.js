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

import { SIGNIN_USER } from "../../queries";

import Error from "./Error";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

const initialState = {
  username: "",
  password: ""
};

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();

    signinUser()
      .then(async ({ data }) => {
        localStorage.setItem("token", data.signinUser.token);

        await this.props.refetch();

        this.clearInputs();
        this.props.history.push("/");
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
    const { username, password } = this.state;

    const isInvalid = !username || !password;

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
            Sign in
          </Typography>
          <Mutation
            mutation={SIGNIN_USER}
            variables={{
              username: this.state.username,
              password: this.state.password
            }}
          >
            {(signinUser, { data, loading, error }) => {
              return (
                <form
                  className={classes.form}
                  onSubmit={event => {
                    this.handleSubmit(event, signinUser);
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading || this.validateForm()}
                  >
                    Sign in
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

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Signin));
