import React, { useContext, useEffect } from 'react';
import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import backgroundImg from './images/background.jpg';
import LandingPage from './views/LandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import { ContentProvider } from './ContentProvider';
import GamePage from './views/GamePage';
import GameLobby from './components/GameLobby';
import PageNotFound from './views/PageNotFound';

function App() {
  return (
    <div>
      <Helmet>
        <style>
          {`
                body {
                  background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), url(${backgroundImg});
                  background-position: center center;
                  background-size: cover
                }
              `}
        </style>
      </Helmet>
      <div>
        <Switch>
          <Route exact path="/">
            <ContentProvider>
              <LandingPage />
            </ContentProvider>
          </Route>
          <Route path="/:game">
            <SocketProvider>
              {/* TODO make a more aesthetic loading component */}
              <SocketGate loading={<p>establishing websocket connection...</p>}>
                <ContentProvider>
                  <GameSession />
                </ContentProvider>
              </SocketGate>
            </SocketProvider>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

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
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
