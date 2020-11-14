import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import colonel_mustard from '../../images/colonel_mustard.jpg';
import Draggable from 'react-draggable';
import SocketContext from '../../SocketContext';

export default function Colonel({ id, initialPos, movable }) {
  const [pos, setPos] = useState(initialPos);

  const socket = useContext(SocketContext);

  useEffect(() => {
    setPos(initialPos);
  }, [initialPos]);

  function handleOnStop(e, pos) {
    if (movable) {
      const { x, y } = pos;
      setPos({ x, y });
      socket.emit('playerMoved', pos[socket.id]);
    }
    console.log(pos);
  }

  return (
    <Draggable position={pos} onStop={handleOnStop}>
      <img src={colonel_mustard} />
    </Draggable>
  );
}
