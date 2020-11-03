import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import GamePage from "./views/GamePage";
import CombinedLandingPage from "./views/CombinedLandingPage";
import { SocketProvider, SocketGate } from "./SocketContext";
import backgroundImage from "./images/bg_2.jpg";

/* TODO if we add the "bp3-dark" class here (or any container) we get dark theme! (consider making a switch to do this) */
/* TODO add route for specific game board */
/* TODO Improve landing page UI and colors */
function App() {
  return (
    <div id="app">
      <Helmet>
        <style>
          {`
                    body {
                      background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), url(${backgroundImage});
                      background-position: center center;
                      background-size: cover
                    }
                `}
        </style>
      </Helmet>
      <div className="outerContainer">
        <Switch>
          <Route exact path="/">
            <CombinedLandingPage />
          </Route>
          <Route path="/game">
            <SocketProvider>
              <SocketGate loading={<p>establishing websocket connection...</p>}>
                <GamePage />
              </SocketGate>
            </SocketProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

{
  /*<div className="App">*/
}
{
  /*    <Switch>*/
}
{
  /*        /!* TODO add route for specific game board *!/*/
}
{
  /*        /!* NOTE: path="/" MUST be at the end because it will always match *!/*/
}
{
  /*        <Route path="/">*/
}
{
  /*            /!* TODO if we add the "bp3-dark" class here (or any container) we get dark theme! (consider making a switch to do this) *!/*/
}
{
  /*            /!* TODO replace with some landing page *!/*/
}
{
  /*        </Route>*/
}
{
  /*    </Switch>*/
}
{
  /*</div>*/
}
