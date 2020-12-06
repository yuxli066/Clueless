import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import backgroundImg from './images/background.jpg';
import LandingPage from './views/LandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import { ContentProvider } from './ContentProvider';
import GamePage from './views/GamePage';
import GameLobby from './components/GameLobby';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
                  <DndProvider backend={HTML5Backend}>
                    <GameSession />
                  </DndProvider>
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
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const handleJoin = useCallback((playerInfo) => {
    setConnectedPlayers(playerInfo);
  }, []);

  useEffect(() => {
    console.log('joining the single instance room...');
    socket.emit('join', 'single-instance-game');
    socket.on('playerList', handleJoin);
    return () => {
      console.log('unmounting and disconnecting from the single instance room...');
      socket.off('playerList', handleJoin);
      socket.emit('leave', 'single-instance-game');
    };
  }, [socket, handleJoin]);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/game`}>
        <GamePage playerMap={connectedPlayers} />
      </Route>
      <Route path={`${match.path}/lobby`}>
        <GameLobby allPlayers={connectedPlayers} />
      </Route>
    </Switch>
  );
}

export default App;
