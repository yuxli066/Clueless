import React, { useCallback, useEffect, useContext } from 'react';
import SocketContext from '../../SocketContext';
import Board from './Board';
import { AppToaster } from '../toaster';
import { Container } from 'react-bootstrap';

function GameController() {
  const socket = useContext(SocketContext);

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => {
    console.log('client said:', resp);
    AppToaster.show({ message: resp });
  }, []);

  useEffect(() => {
    socket.on('notification', handleResponse);

    return () => {
      socket.off('notification', handleResponse);
    };
  }, [socket, handleResponse]);

  function showToast() {
    socket.emit('display_notification', 'Testing');
  }
  return (
    <Container fluid className="innerContainer">
      <Board />
      <button onClick={showToast}>Display Message</button>
    </Container>
  );
}

export default GameController;
