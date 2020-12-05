import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import { useToast, Grid, GridItem } from '@chakra-ui/react';
import Colonel from './Colonal';
import GameCard from './GameCard';
import SocketContext from '../../../src/SocketContext';
import { useContentContext } from '../../ContentProvider';

export default function Board() {
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const socket = useContext(SocketContext);
  const initialLocation = useMemo(() => ({ x: 2, y: 7 }), []);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });
  const id = useRef(undefined);
  const positionRef = useRef(positions);
  const showToast = useToast();

  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  useEffect(() => {
    socket.emit('newPlayer', initialLocation);
  }, [socket, initialLocation]);

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
    setPositions(pos);
  }, []);

  const handleId = useCallback((clientId) => {
    id.current = clientId;
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);
    socket.on('clientId', handleId);
    socket.on('notification', handleMessageResponse);

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('clientId', handleId);
      socket.off('notification', handleResponse);
    };
  }, [socket, handlePosition, handleResponse, handleMessageResponse, handleId]);

  // FIXME handle this eslint diable!
  // eslint-disable-next-line no-unused-vars
  function handleSubmitAccusation() {
    var notificationString = 'Player made a suggestion/accusation';
    socket.emit('display_notification', notificationString);
  }

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
              <Colonel id="testing1" movable={true} initialPos={initialLocation} />
            </RoomHallway>
            <RoomHallway
              colStart={3}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway colStart={4} rowStart={2} imageUrl={Content.images['hall-room'].default} />
            <RoomHallway
              colStart={5}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway
              colStart={6}
              rowStart={2}
              imageUrl={Content.images['lounge-room'].default}
            />

            <RoomHallway
              colStart={2}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            />
            <EmptySpace colStart={3} rowStart={3} />
            <RoomHallway
              colStart={4}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            />
            <EmptySpace colStart={5} rowStart={3} />
            <RoomHallway
              colStart={6}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            />

            <RoomHallway
              colStart={2}
              rowStart={4}
              imageUrl={Content.images['library-room'].default}
            />
            <RoomHallway
              colStart={3}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway
              colStart={4}
              rowStart={4}
              imageUrl={Content.images['billiards-room'].default}
            />
            <RoomHallway
              colStart={5}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway
              colStart={6}
              rowStart={4}
              imageUrl={Content.images['dining-room'].default}
            />

            <RoomHallway
              colStart={2}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            />
            <EmptySpace colStart={3} rowStart={5} />
            <RoomHallway
              colStart={4}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            />
            <EmptySpace colStart={5} rowStart={5} />
            <RoomHallway
              colStart={6}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            />

            <EmptySpace colStart={1} rowStart={6} />

            <RoomHallway
              colStart={2}
              rowStart={6}
              imageUrl={Content.images['conservatory-room'].default}
            />
            <RoomHallway
              colStart={3}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway colStart={4} rowStart={6} imageUrl={Content.images['ball-room'].default} />
            <RoomHallway
              colStart={5}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            />
            <RoomHallway
              colStart={6}
              rowStart={6}
              imageUrl={Content.images['kitchen-room'].default}
            />

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

function RoomHallway(props) {
  const socket = useContext(SocketContext);
  // let children;

  const drop = (e) => {
    e.preventDefault();
    const player_id = e.dataTransfer.getData('player_id');
    const player = document.getElementById(player_id);
    player.style.display = 'block';
    player.style.margin = 'auto';
    player.style.marginTop = '2em';
    e.target.appendChild(player);
    const newPos = { x: props.colStart, y: props.rowStart };
    socket.emit('playerMovement', newPos);
    console.log('pos is', newPos);
    // Not sure if we need this below:
    // was thinking of passing position to children so other clients can have access to those positions
    // bind children to props to pass position to player level comp
    // children = React.children.map(props.children, child => {
    //   return React.cloneElement(child, {
    //     someFunction: () => this.setPos(newPos)
    //   });
    // });
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <GridItem
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      colStart={props.colStart}
      rowStart={props.rowStart}
      backgroundImage={`url(${props.imageUrl})`}
    >
      {props.children}
    </GridItem>
  );
}

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
