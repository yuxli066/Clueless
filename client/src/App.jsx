import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { SocketGate, SocketProvider } from "./SocketContext";
import Board from "./Board";

function App() {
  return (
    <Switch>
      {/* TODO this will have to include some sort of parameter for the game (for multiple sessions) */}
      <Route path="/game">
        <SocketProvider>
          <SocketGate loading={<p>establishing websocket connection...</p>}>
            <Board />
          </SocketGate>
        </SocketProvider>
      </Route>
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
            <a className="App-link" href={`${window.location.href}game`}>
              Connect to websocket
            </a>
          </header>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
