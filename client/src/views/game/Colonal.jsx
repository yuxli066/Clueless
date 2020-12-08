import React from 'react';
import { Box } from '@chakra-ui/react';
import colonel_mustard from '../../images/colonel_mustard.jpg';
import not_colonel_mustard from '../../images/colonel_mustard_Not_You.jpg';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function Colonel({ id, movable, colStart, rowStart }) {
  // eslint-disable-next-line
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.PLAYER,
      id: id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Box
      ref={drag}
      opacity={isDragging ? '0.5' : '1'}
      id={id}
      backgroundImage={id === 'Client' ? `url(${colonel_mustard})` : `url(${not_colonel_mustard})`}
      width="100px"
      height="100px"
      zIndex={5}
    ></Box>
  );
}
