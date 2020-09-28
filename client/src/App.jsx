import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      {/* TODO add route for specific game board */}
      {/* NOTE: path="/" MUST be at the end bc it will always match */}
      <Route path="/">
        {/* TODO replace with some landing page */}
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
