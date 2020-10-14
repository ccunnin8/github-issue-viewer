import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Results from "./components/Results";
import Issue from "./components/Issue";
import Search from "./components/Search"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"} component={Search} />
        <Route exact path ={process.env.PUBLIC_URL + "/results"} component={Results} />
        <Route exact path={process.env.PUBLIC_URL + "/results/:id"} component={Results} />
        <Route exact path={process.env.PUBLIC_URL + "/issue/:id"} component={Issue} />
      </Switch>
    </Router>
  );
}

export default App;
