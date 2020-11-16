import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import clue_board from '../../images/clue_board.jpg';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';

export default function Board() {
  // TODO we can inline this var if we want!
  // using useMemo so that eslint is happy
  const initialLocation = useMemo(() => ({ x: Math.random() * 700, y: Math.random() * 600 }), []);
  const id = useRef(undefined);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });

  const positionRef = useRef(positions);
  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('newPlayer', initialLocation);
  }, [socket, initialLocation]);

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => console.log('Response from server: ', resp), []);

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

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('clientId', handleId);
    };
  }, [socket, handlePosition, handleResponse, handleId]);

  return (
    <div
      style={{
        backgroundImage: `url(${clue_board})`,
        height: 752,
        width: 792,
      }}
    >
      {Object.entries(positions).map(([key, pos]) => {
        console.log('key here is: ', key);
        console.log('pos here is:', pos);
        return (
          <Colonel
            key={key}
            id={key}
            initialPos={{ x: pos.x, y: pos.y }}
            movable={key === id.current}
          />
        );
      })}
    </div>
  );
}
