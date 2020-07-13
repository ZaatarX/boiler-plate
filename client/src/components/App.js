import React from "react";
import About from "./about/";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
