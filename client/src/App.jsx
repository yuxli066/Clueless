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
  // const [currentPlayer,setCurrentPlayer] = useState({});

  const handleEvent = useCallback(
    (eventName, timeout = 5000) => {
      return new Promise((resolve, reject) => {
        let timer;
        function responseHandler(clientId) {
          resolve(clientId);
          clearTimeout(timer);
        }
        socket.once(eventName, responseHandler);
        timer = setTimeout(() => {
          reject(new Error(`timeout waiting for event ${eventName}`));
        }, timeout);
      });
    },
    [socket],
  );

  useEffect(() => {
    console.log('joining the single instance room...');
    // TODO in the future, we will need a request/response for getting a lobby
    socket.emit('join', 'single-instance-game');
    handleEvent('playerList').then((playas) => setConnectedPlayers(playas));
    return () => {
      console.log('unmounting and disconnecting from the single instance room...');
      socket.off('playerList', setConnectedPlayers);
      socket.emit('leave', 'single-instance-game');
    };
  }, [socket, handleEvent]);

  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/game`}>
        <GamePage playerMap={connectedPlayers} />
      </Route>
      <Route path={`${match.path}/lobby`}>
        <GameLobby connectedPlayers={connectedPlayers} />
      </Route>
    </Switch>
  );
}

export default App;
