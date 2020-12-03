import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SocketContext from '../SocketContext';
import LobbyPlayer from './LobbyPlayer';
import { Box, Button, Center, Divider, Heading, List, ListItem, Text } from '@chakra-ui/react';

export default function GameLobby() {
  const socket = useContext(SocketContext);
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const history = useHistory();
  // TODO I feel like there should be a better way to do this...
  const historyRef = useRef(history);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const handleGameStart = useCallback(() => {
    console.log('redirecting!!');
    historyRef.current.push('/0/game');
  }, []);

  // TODO we should just listen for the message type we need for the lobby. the room was established in the session component!
  useEffect(() => {
    // TODO is just using the setter here directly safe or do we need a callback?
    socket.on('playerList', setConnectedPlayers);
    socket.on('startGame', handleGameStart);

    return () => {
      socket.off('playerList', setConnectedPlayers);
      socket.off('startGame', handleGameStart);
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
              <LobbyPlayer name={player.name} self={player.id === socket.id} />
            </Center>
            <Divider margin={4} />
          </ListItem>
        ))}
      </List>
      <Center>
        <Text>Get 3-5 friends to join this lobby to start!</Text>
      </Center>
      <Center>
        {/* FIXME don't forget to undo this! */}
        <Link
          disabled={connectedPlayers.length < 4 || connectedPlayers.length > 6}
          component={StartGameButton}
          to="/0/game"
        >
          Start the Game!
        </Link>
      </Center>
    </Box>
  );
}

const StartGameButton = React.forwardRef((props, ref) => {
  const socket = useContext(SocketContext);

  const { disabled } = props;

  // FIXME update socket to properly emit game start (either via game room prop or on the server side!)
  return (
    <Button
      colorScheme="blue"
      margin={4}
      disabled={disabled}
      onClick={() => socket.emit('requestGameStart', 'single-instance-game')}
    >
      Start the Game!
    </Button>
  );
});
