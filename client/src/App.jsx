import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Switch, Route, useRouteMatch, useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import backgroundImg from './images/background.jpg';
import LandingPage from './views/LandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import { ContentProvider } from './ContentProvider';
import GameController from './views/game/GameController';
import GameLobby from './components/GameLobby';
import { Box, Button, ButtonGroup, Center, Heading } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
          <SocketProvider>
            <SocketGate loading={<p>establishing websocket connection...</p>}>
              <Switch>
                <Route exact path="/create-or-join">
                  <CreateOrJoin />
                </Route>
                <Route path="/:game">
                  <ContentProvider>
                    <DndProvider backend={HTML5Backend}>
                      <GameSession />
                    </DndProvider>
                  </ContentProvider>
                </Route>
              </Switch>
            </SocketGate>
          </SocketProvider>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

// NOTE: how come socket io does not work if I wrap it with a Promise?
function GameSession() {
  const socket = useContext(SocketContext);
  const match = useRouteMatch();
  const lobby = match.url.substring(1); // drop the first character (it's a '/')

  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const handleJoin = useCallback((playerInfo) => {
    setConnectedPlayers(playerInfo);
  }, []);

  useEffect(() => {
    console.log('joining lobby', lobby);
    socket.emit('join', lobby);
    socket.on('playerList', handleJoin);
    return () => {
      console.log('unmounting and disconnecting from lobby', lobby);
      socket.emit('leave', lobby);
      socket.off('playerList');
    };
  }, [socket, handleJoin, lobby]);

  return (
    <Switch>
      <Route exact path={`${match.path}/game`}>
        <GameController playerMap={connectedPlayers} />
      </Route>
      <Route exact path={`${match.path}/lobby`}>
        <GameLobby connectedPlayers={connectedPlayers} lobby={lobby} />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}

// TODO we should move this to a new file
function CreateOrJoin() {
  // TODO consider a convenience hook that just returns the ref for history?
  const history = useHistory();
  const historyRef = useRef(history);
  const socket = useContext(SocketContext);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const handleJoinLobby = useCallback((lobby) => {
    historyRef.current.push(`/${lobby}/lobby`);
  }, []);

  useEffect(() => {
    socket.on('lobby', handleJoinLobby);
    return () => socket.off('lobby');
  });

  return (
    <Center>
      <Box bg="white" p={4} textAlign="center">
        <Heading>Start a New Lobby or Join an Existing One</Heading>
        <Heading size="lg">Or, get a link from a firend!</Heading>
        <Center>
          <ButtonGroup p={4} colorScheme="blue">
            {/* TODO consider making this a general component */}
            {/* each time the link is clicked a different nanoid is created, which is expected (we should only need it once) */}
            <Button as={Link} to={`/${nanoid(10)}/lobby`}>
              Create New Lobby
            </Button>
            <Button onClick={() => socket.emit('join', undefined)}>Join Random Lobby</Button>
          </ButtonGroup>
        </Center>
      </Box>
    </Center>
  );
}

export default App;
