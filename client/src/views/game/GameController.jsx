import React, { useState, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import SocketContext from '../../SocketContext';
import { Button, Position, Toast, Toaster } from '@blueprintjs/core';
import { AppToaster } from '../toaster';

function GameController() {
  const [count, setCount] = useState(0);
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
  }, []);

  function showToast() {
    socket.emit('display_notification', 'Testing');
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={showToast}>Display Message</button>
    </div>
  );
}

export default GameController;
