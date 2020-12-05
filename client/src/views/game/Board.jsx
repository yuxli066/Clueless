import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import { useToast, Grid, GridItem } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import Colonel from './Colonal';
import GameCard from './GameCard';
import { ItemTypes } from './ItemTypes';
import { observe, movePlayer } from './observers';
import SocketContext from '../../../src/SocketContext';
import { useContentContext } from '../../ContentProvider';

const getInitialLocation = (playerName) => {
  switch (playerName) {
    case 'Colonel Mustard':
      return [2, 2];
    case 'Rev. Green':
      return [3, 7];
    case 'Professor Plum':
      return [1, 3];
    case 'Miss Scarlet':
      return [5, 1];
    case 'Mrs. Peacock':
      return [1, 5];
    case 'Mrs. White':
      return [5, 7];
    default:
      return 'none';
  }
};

export default function Board(props) {
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const socket = useContext(SocketContext);
  const id = useRef(undefined);
  const showToast = useToast();
  const initialLocation = useMemo(() => getInitialLocation('Colonel Mustard'), []);
  const [positions, setPositions] = useState(initialLocation);
  const positionRef = useRef(positions);

  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);
  useEffect(() => {
    socket.emit('newPlayer', initialLocation);
  }, [socket, initialLocation]);
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

  const handleId = useCallback((clientId) => {
    id.current = clientId;
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);
    socket.on('clientId', handleId);
    socket.on('notification', handleMessageResponse);
    // console.log("playa playa map")
    // console.log(props.playerMap)
    // console.log("playa playa map")
    // console.log(`You are playing as: ${props.playerMap[id.current]}, your initial location is: ${JSON.stringify(initialLocation)}`)
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('clientId', handleId);
      socket.off('notification', handleResponse);
    };
  }, [
    socket,
    handlePosition,
    handleResponse,
    handleMessageResponse,
    handleId,
    props.playerMap,
    initialLocation,
  ]);

  // FIXME handle this eslint diable!
  // eslint-disable-next-line no-unused-vars
  function handleSubmitAccusation() {
    var notificationString = 'Player made a suggestion/accusation';
    socket.emit('display_notification', notificationString);
  }

  const renderPiece = (x, y) => {
    const [playerX, playerY] = positions;
    const playerExists = x === playerX && y === playerY;
    return playerExists ? <Colonel id={'mustard'} /> : null;
  };

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
