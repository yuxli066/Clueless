import React from 'react';
import { Box } from '@chakra-ui/react';
import colonel_mustard from '../../images/colonel_mustard.jpg';
// import not_colonel_mustard from '../../images/colonel_mustard_Not_You.jpg';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function Colonel({ id, movable }) {
  // eslint-disable-next-line
  const [{}, drag] = useDrag({
    item: { type: ItemTypes.PLAYER },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <Box
      ref={drag}
      id={id}
      backgroundColor="black"
      backgroundImage={`url(${colonel_mustard})`}
      width="100px"
      height="100px"
    ></Box>
  );
}
