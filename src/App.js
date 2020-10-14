import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Results from "./components/Results";
import Issue from "./components/Issue";
import Search from "./components/Search"
function App() {
  return (
    <Router>
      <Route exact path="/" component={Search} />
      <Route exact path ="/results" component={Results} />
      <Route exact path="/:id" component={Results} />
      <Route exact path="/issue/:id" component={Issue} />
    </Router>
  );
}

export default App;
