import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import backgroundImg from './images/background.jpg';
import LandingPage from './views/LandingPage';
import SocketContext, { SocketProvider, SocketGate } from './SocketContext';
import { ContentProvider } from './ContentProvider';
import GamePage from './views/GamePage';
import GameLobby from './components/GameLobby';
import { Box, Button, ButtonGroup, Center, Heading } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

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
              <Route exact path="/create-or-join">
                <CreateOrJoin />
              </Route>
              {/* TODO consider adding something here first to create a new lobby or join a random one */}
              <Route path="/:game">
                {/* TODO make a more aesthetic loading component */}
                <ContentProvider>
                  <GameSession />
                </ContentProvider>
              </Route>
            </SocketGate>
          </SocketProvider>
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
