import './App.css';
import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GamePage from './views/GamePage';
import CombinedLandingPage from './views/CombinedLandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import backgroundImage from './images/bg_2.jpg';
import GameLobby from './components/GameLobby';
import { useEffect } from 'react';

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
          <Route path="/:game">
            <SocketProvider>
              {/* TODO make a more aesthetic loading component */}
              <SocketGate loading={<p>establishing websocket connection...</p>}>
                <GameSession />
              </SocketGate>
            </SocketProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

// TODO I feel like this could have a better name
function GameSession() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log('joining the single instance room...');
    // TODO in the future, we will need a request/response for getting a lobby
    socket.emit('join', 'single-instance-game');

    return () => {
      console.log('unmounting and disconnecting from the single instance room...');
      socket.emit('leave', 'single-instance-game');
    };
  }, [socket]);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/game`}>
        <GamePage />
      </Route>
      <Route path={`${match.path}/lobby`}>
        <GameLobby />
      </Route>
    </Switch>
  );
}

export default App;
