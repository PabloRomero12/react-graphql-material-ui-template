import React from "react";
import Button from "@material-ui/core/Button";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleSignout = (client, history) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handleSignout(client, history)}
        >
          Logout
        </Button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
