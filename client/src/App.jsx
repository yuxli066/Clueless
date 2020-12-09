import React, { useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import backgroundImg from './images/background.jpg';
import LandingPage from './views/LandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import { ContentProvider } from './ContentProvider';
import GamePage from './views/GamePage';
import GameLobby from './components/GameLobby';

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
          {/* TODO consider adding something here first to create a new lobby or join a random one */}
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
        </Switch>
      </div>
    </div>
  );
}

function GameSession() {
  const socket = useContext(SocketContext);
  const match = useRouteMatch();
  const lobby = match.url.substring(1); // drop the first character (it's a '/')

  useEffect(() => {
    console.log('joining lobby', lobby);
    socket.emit('join', lobby);

    return () => {
      console.log('unmounting and disconnecting from lobby', lobby);
      socket.emit('leave', lobby);
    };
  }, [socket, lobby]);

  return (
    <Switch>
      <Route path={`${match.path}/game`}>
        <GamePage />
      </Route>
      <Route path={`${match.path}/lobby`}>
        <GameLobby lobby={lobby} />
      </Route>
    </Switch>
  );
}

export default App;
