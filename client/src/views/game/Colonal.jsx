import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function Colonel({ id, movable, playerIcon }) {
  // eslint-disable-next-line
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: {
      type: ItemTypes.PLAYER,
      id: id,
    },
    canDrag: () => movable,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
  });
  return (
    <Box
      ref={drag}
      opacity={isDragging ? '0.5' : '1'}
      id={id}
      backgroundImage={`url(${playerIcon})`}
      width="100px"
      height="100px"
      zIndex={5}
    ></Box>
  );
}
