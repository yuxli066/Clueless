import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import clue_board from '../../images/clue_board.jpg';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';

export default function Board() {
  // TODO we can inline this var if we want!
  const initialLocation = { x: Math.random() * 700, y: Math.random() * 600 };
  const id = useRef(undefined);
  const [positions, setPositions] = useState([]);

  const positionRef = useRef(positions);
  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

  socket.on('response', (resp) => {
    console.log('Response from server: ', resp);
  });

  console.log(positions);

  // on first mount of the board, send a socket
  // TODO possibly send a disconnect message? (server handles it too though)
  useEffect(() => {
    socket.on('new_client', { ...initialLocation });
  }, []);

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => console.log('Response from server: ', resp), []);
  const handlePosition = useCallback((pos) => {
    console.log('Changed Position!', pos);
    setPositions([...positionRef.current, pos]);
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('pos_change', handlePosition);

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('pos_change', handlePosition);
    };
  }, [socket, handlePosition, handleResponse]);

  socket.on('playerMoved', (playerInfo) => {
    playerInfo.handlePosition(playerInfo.x, playerInfo.y);
  });
  return (
    <div
      style={{
        backgroundImage: `url(${clue_board})`,
        height: 752,
        width: 792,
      }}
    >
      {positions.map((position) => (
        <Colonel
          className="player"
          key={position.id}
          id={id.current}
          initialPos={{ x: position.x, y: position.y }}
          movable={position.id === id.current}
        />
      ))}
    </div>
  );
}
