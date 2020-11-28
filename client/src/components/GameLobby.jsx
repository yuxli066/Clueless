import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import SocketContext from '../SocketContext';
import LobbyPlayer from './LobbyPlayer';
// FIXME this is a temporary solution to have a lobby until we move to chakra!
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GameLobby() {
  const socket = useContext(SocketContext);
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const history = useHistory();
  // TODO I feel like there should be a better way to do this...
  const historyRef = useRef(history);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // TODO make sure this will actually be okay (i think history is mutable?)
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

  return (
    <Card className="text-center">
      <Card.Body>
        {/* TODO make the title bigger! (currently h1's css seems to make things slightly off-center) */}
        <Card.Title>Game Lobby</Card.Title>
        {/* TODO add in connected player list */}
        <ListGroup>
          {/* TODO based off the player list! */}
          {connectedPlayers.map((player) => (
            <ListGroup.Item key={player.id}>
              <LobbyPlayer name={player.name} self={player.id === socket.id} />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Text>Get 3-5 friends to join this lobby to start!</Card.Text>
        {/* FIXME don't forget to undo this! */}
        <Link
          disabled={connectedPlayers.length < 4 || connectedPlayers.length > 6}
          component={StartGameButton}
          to="/0/game"
        >
          Start the Game!
        </Link>
      </Card.Body>
    </Card>
  );
}

const StartGameButton = React.forwardRef((props, ref) => {
  const socket = useContext(SocketContext);

  const { disabled } = props;

  // FIXME update socket to properly emit game start (either via game room prop or on the server side!)
  return (
    <Button
      variant="primary"
      disabled={disabled}
      onClick={() => socket.emit('requestGameStart', 'single-instance-game')}
    >
      Start the Game!
    </Button>
  );
});
