import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import GameCard from './GameCard';
import { Grid, useToast } from '@chakra-ui/react';
import { useContentContext } from '../../ContentProvider';

export default function Board() {
  // TODO we can inline this var if we want!
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const initialLocation = useMemo(() => ({ x: Math.random() * 700, y: Math.random() * 600 }), []);
  const id = useRef(undefined);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });
  const positionRef = useRef(positions);
  const showToast = useToast();

  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('newPlayer', initialLocation);
  }, [socket, initialLocation]);

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => console.log('Response from server: ', resp), []);

  const handleMessageResponse = useCallback(
    (resp) => {
      console.log('client said:', resp);
      showToast({
        description: resp,
        isClosable: true,
        position: 'top',
        status: 'success',
      });
    },
    [showToast],
  );

  const handlePosition = useCallback((pos) => {
    console.log('Changed Position!', pos);
    setPositions(pos);
  }, []);

  const handleId = useCallback((clientId) => {
    id.current = clientId;
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);
    socket.on('clientId', handleId);
    socket.on('notification', handleMessageResponse);

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('clientId', handleId);
      socket.off('notification', handleResponse);
    };
  }, [socket, handlePosition, handleResponse, handleMessageResponse, handleId]);

  // FIXME handle this eslint diable!
  // eslint-disable-next-line no-unused-vars
  function handleSubmitAccusation() {
    var notificationString = 'Player made a suggestion/accusation';
    socket.emit('display_notification', notificationString);
  }

  return (
    <Grid
      rowGap={'2ch'}
      templateColumns={{
        xl: '1fr 35%',
      }}
      templateRows={{ xl: '1000px' }}
    >
      <div
        style={{
          backgroundImage: `url(${Content.images['custom_game_board'].default})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        {Object.entries(positions).map(([key, pos]) => (
          <Colonel
            key={key}
            id={key}
            initialPos={{ x: pos.x, y: pos.y }}
            movable={key === id.current}
          />
        ))}
      </div>
      <GameCard />
    </Grid>
  );
}
