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
          <Route exact path="/" component={Search} />
          <Route exact path ="/results" component={Results} />
          <Route exact path="/results/:id" component={Results} />
          <Route exact path="/issue/:id" component={Issue} />
        </Switch>
    </Router>
  );
}

export default App;
