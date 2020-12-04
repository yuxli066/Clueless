import React, { useEffect, useState, useContext } from 'react';
import colonel_mustard from '../../images/colonel_mustard.jpg';
import not_colonel_mustard from '../../images/colonel_mustard_Not_You.jpg';
import { Box } from '@chakra-ui/react';
import SocketContext from '../../SocketContext';

export default function Colonel(props) {
  const [pos, setPos] = useState(props.initialPos);
  const socket = useContext(SocketContext);

  useEffect(() => {
    setPos(props.initialPos);
  }, [props.initialPos]);

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData('player_id', target.id);
    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  // function handleOnStop(e, pos) {
  //   if (movable) {
  //     const { x, y } = pos;
  //     setPos({ x, y });
  //     socket.emit('playerMovement', { x: pos.x, y: pos.y });
  //   }
  //   console.log('pos is', pos);
  // }

  return (
    <Box
      id={props.id}
      draggable={props.movable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      backgroundColor="black"
      backgroundImage={props.movable ? `url(${colonel_mustard})` : `url(${not_colonel_mustard})`}
      width="100px"
      height="100px"
    />
  );
}
