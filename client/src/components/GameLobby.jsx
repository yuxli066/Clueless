import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SocketContext from '../SocketContext';
import LobbyPlayer from './LobbyPlayer';
import { Box, Button, Center, Divider, Heading, List, ListItem, Text } from '@chakra-ui/react';

export default function GameLobby({ connectedPlayers, lobby }) {
  const socket = useContext(SocketContext);
  const history = useHistory();
  // TODO I feel like there should be a better way to do this...
  const historyRef = useRef(history);
  // NOTE we most likely don't need this but I'm putting it here in the very rare chance lobby changes
  const lobbyRef = useRef(lobby);

  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const handleGameStart = useCallback(() => {
    console.log('redirecting!!');
    historyRef.current.push(`/${lobbyRef.current}/game`);
  }, []);

  // TODO we should just listen for the message type we need for the lobby. the room was established in the session component!
  useEffect(() => {
    // TODO is just using the setter here directly safe or do we need a callback?
    socket.on('startGame', handleGameStart);
    return () => {
      socket.off('playerList');
      socket.off('startGame');
    };
  }, [socket, handleGameStart]);

  // TODO better styling!
  return (
    <Box bg="white">
      {/* TODO I feel like there's a better way to handle all of this than with center components everywhere... */}
      <Center>
        <Heading>Game Lobby</Heading>
      </Center>
      <Divider margin={4} />
      <List>
        {connectedPlayers.map((player) => (
          <ListItem key={player.id}>
            <Center>
              <LobbyPlayer name={player.playaInformation.name} self={player.id === socket.id} />
            </Center>
            <Divider margin={4} />
          </ListItem>
        ))}
      </List>
      <Center>
        <Text>Get 3-5 friends to join this lobby to start!</Text>
      </Center>
      <Center>
        <Link
          disabled={connectedPlayers.length < 4 || connectedPlayers.length > 6}
          lobby={lobbyRef.current}
          component={StartGameButton}
        >
          Start the Game!
        </Link>
      </Center>
    </Box>
  );
}

const StartGameButton = React.forwardRef((props, ref) => {
  const socket = useContext(SocketContext);

  const { disabled, lobby } = props;

  // FIXME update socket to properly emit game start (either via game room prop or on the server side!)
  return (
    <Button
      colorScheme="blue"
      margin={4}
      disabled={disabled}
      onClick={() => socket.emit('requestGameStart', lobby)}
    >
      Start the Game!
    </Button>
  );
});
