import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";

function App() {
  return (
    <div className="App">
      <Query query={GET_ALL_RECIPES}>
        {(data, loading, error) => {
          if (loading) return <h1>LOADING ...</h1>;
          if (error) return <h1>ERROR</h1>;

          console.log(data);
          return <h1>Home</h1>;
        }}
      </Query>
    </div>
  );
}

export default App;
