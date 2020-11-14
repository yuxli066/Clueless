import React, { useEffect, useState, useContext } from 'react';
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
    console.log(movable);
    if (movable) {
      const { x, y } = pos;
      setPos({ x, y });
      socket.emit('playerMovement', { x: pos.x, y: pos.y });
    }
    console.log('pos is', pos);
  }

  return (
    <Draggable position={pos} onStop={handleOnStop}>
      <img src={colonel_mustard} alt="colonel mustard" />
    </Draggable>
  );
}
