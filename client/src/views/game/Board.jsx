import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useToast, Grid, GridItem } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
// eslint-disable-next-line no-unused-vars
import Colonel from './Colonal';
import GameCard from './GameCard';
import { ItemTypes } from './ItemTypes';
import { observe, movePlayer } from './observers';
import SocketContext from '../../../src/SocketContext';
import { useContentContext } from '../../ContentProvider';

export default function Board({ playerMap, initLocation }) {
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const socket = useContext(SocketContext);
  const showToast = useToast();
  const [positions, setPositions] = useState([initLocation]);
  const positionRef = useRef(positions);

  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);
  useEffect(() => observe((newPos) => setPositions(newPos)));
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
    //setPositions(pos);
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);
    socket.on('notification', handleMessageResponse);
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('notification', handleResponse);
    };
  }, [socket, handlePosition, handleResponse, handleMessageResponse]);

  // FIXME handle this eslint diable!
  // eslint-disable-next-line no-unused-vars
  function handleSubmitAccusation() {
    var notificationString = 'Player made a suggestion/accusation';
    socket.emit('display_notification', notificationString);
  }

  // render client
  const renderPiece = (x, y) => {
    // console.log(props.playerMap)
    // console.log(positions)
    // let player;
    // Object.entries(positions).forEach(([key, pos]) => {
    //   const [playerX, playerY] = pos;
    //   const playerExists = x === playerX && y === playerY;
    //   player = ( playerExists ?
    //     <Colonel
    //       key={key}
    //       id={key} />
    //     : null)
    // })
    // return player;
  };

  // // render other clients
  // const renderPiece = (x, y) => {
  //   {Object.entries(positions).map(([key, pos]) => (
  //     <Colonel
  //       key={key}
  //       id={key}
  //       initialPos={{ x: pos.x, y: pos.y }}
  //       movable={key === id.current}
  //     />
  //   ))}
  //   const [playerX, playerY] = positions;
  //   const playerExists = x === playerX && y === playerY;
  //   return playerExists ? <Colonel id={'mustard'} /> : null;
  // };

  return (
    <div>
      <Grid templateRows="repeat(12, 1fr)" templateColumns="repeat(6, 1fr)" w="100%" h="100%">
        <GridItem rowSpan={13} colSpan={1}>
          <div> Nav Bar Goes Here</div>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <div
            style={{ backgroundColor: '#fcfbf5', width: '100%', height: '100%', borderRadius: 12 }}
          >
            Players go here
          </div>
        </GridItem>
        <GridItem padding="2em" rowSpan={8} colSpan={4}>
          <Grid
            backgroundColor="white"
            templateRows="10% repeat(5, 200px) 10%"
            templateColumns="10% repeat(5, 1fr) 10%"
            w="100%"
            h="100%"
          >
            <RoomHallway colStart={2} rowStart={2} imageUrl={Content.images['study-room'].default}>
              {renderPiece(2, 2)}
            </RoomHallway>

            <RoomHallway
              colStart={3}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(3, 2)}
            </RoomHallway>

            <RoomHallway colStart={4} rowStart={2} imageUrl={Content.images['hall-room'].default}>
              {renderPiece(4, 2)}
            </RoomHallway>

            <RoomHallway
              colStart={5}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(5, 2)}
            </RoomHallway>

            <RoomHallway colStart={6} rowStart={2} imageUrl={Content.images['lounge-room'].default}>
              {renderPiece(6, 2)}
            </RoomHallway>

            <RoomHallway
              colStart={2}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(2, 3)}
            </RoomHallway>

            <EmptySpace colStart={3} rowStart={3} />

            <RoomHallway
              colStart={4}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(4, 3)}
            </RoomHallway>

            <EmptySpace colStart={5} rowStart={3} />

            <RoomHallway
              colStart={6}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(6, 3)}
            </RoomHallway>

            <RoomHallway
              colStart={2}
              rowStart={4}
              imageUrl={Content.images['library-room'].default}
            >
              {renderPiece(2, 4)}
            </RoomHallway>

            <RoomHallway
              colStart={3}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(3, 4)}
            </RoomHallway>

            <RoomHallway
              colStart={4}
              rowStart={4}
              imageUrl={Content.images['billiards-room'].default}
            >
              {renderPiece(4, 4)}
            </RoomHallway>

            <RoomHallway
              colStart={5}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(5, 4)}
            </RoomHallway>

            <RoomHallway colStart={6} rowStart={4} imageUrl={Content.images['dining-room'].default}>
              {renderPiece(6, 4)}
            </RoomHallway>

            <RoomHallway
              colStart={2}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(2, 5)}
            </RoomHallway>

            <EmptySpace colStart={3} rowStart={5} />

            <RoomHallway
              colStart={4}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(4, 5)}
            </RoomHallway>

            <EmptySpace colStart={5} rowStart={5} />

            <RoomHallway
              colStart={6}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderPiece(6, 5)}
            </RoomHallway>

            <EmptySpace colStart={1} rowStart={6} />

            <RoomHallway
              colStart={2}
              rowStart={6}
              imageUrl={Content.images['conservatory-room'].default}
            >
              {renderPiece(2, 6)}
            </RoomHallway>

            <RoomHallway
              colStart={3}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(3, 6)}
            </RoomHallway>

            <RoomHallway colStart={4} rowStart={6} imageUrl={Content.images['ball-room'].default}>
              {renderPiece(4, 6)}
            </RoomHallway>

            <RoomHallway
              colStart={5}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderPiece(5, 6)}
            </RoomHallway>

            <RoomHallway
              colStart={6}
              rowStart={6}
              imageUrl={Content.images['kitchen-room'].default}
            >
              {renderPiece(6, 6)}
            </RoomHallway>

            <EmptySpace colStart={7} rowStart={6} />
            {[1, 2, 3, 4, 5, 6, 7].map((col) => (
              <EmptySpace colStart={col} rowStart={7} key={col} />
            ))}
          </Grid>
        </GridItem>
        {/*Game Card - TODO: Dropdowns for these should be variables outside of this*/}
        <GridItem colStart={6} colEnd={6} rowStart={1} rowEnd={13}>
          <GameCard />
        </GridItem>

        <GridItem rowStart={12} colStart={2} rowSpan={1} colSpan={4}>
          <div
            style={{ backgroundColor: '#fcfbf5', width: '100%', height: '100%', borderRadius: 12 }}
          >
            Deck goes here
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

const RoomHallway = ({ colStart, rowStart, children, id, imageUrl }) => {
  // eslint-disable-next-line
  const [{ canDrop }, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    canDrop: () => true,
    drop: () => movePlayer(colStart, rowStart),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <GridItem
      ref={drop}
      id={id}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      colStart={colStart}
      rowStart={rowStart}
      backgroundImage={`url(${imageUrl})`}
    >
      {children}
    </GridItem>
  );
};

function EmptySpace(props) {
  return (
    <GridItem
      colStart={props.colStart}
      rowStart={props.rowStart}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundColor="white"
    />
  );
}
