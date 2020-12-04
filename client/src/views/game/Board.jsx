import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { useToast, Grid, GridItem } from '@chakra-ui/react';
import GameCard from './GameCard';
import { useContentContext } from '../../ContentProvider';

export default function Board() {
  // TODO we can inline this var if we want!
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const initialLocation = useMemo(() => ({ x: Math.random() * 700, y: Math.random() * 600 }), []);
  const id = useRef(undefined);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });
  const positionRef = useRef(positions);
  const showToast = useToast();

  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

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
        <GridItem padding="1em" rowSpan={8} colSpan={4}>
          <Grid
            backgroundColor="white"
            templateRows="10% repeat(5, 200px) 10%"
            templateColumns="10% repeat(5, 1fr) 10%"
            w="100%"
            h="100%"
          >
            <GridItem
              colStart={2}
              rowStart={2}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['study-room'].default})`}
            />
            <GridItem
              colStart={3}
              rowStart={2}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={4}
              rowStart={2}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['hall-room'].default})`}
            />
            <GridItem
              colStart={5}
              rowStart={2}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={6}
              rowStart={2}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['lounge-room'].default})`}
            />

            <GridItem
              colStart={2}
              rowStart={3}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              colStart={3}
              rowStart={3}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              colStart={4}
              rowStart={3}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              colStart={5}
              rowStart={3}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              colStart={6}
              rowStart={3}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />

            <GridItem
              colStart={2}
              rowStart={4}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['library-room'].default})`}
            />
            <GridItem
              colStart={3}
              rowStart={4}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={4}
              rowStart={4}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['billiards-room'].default})`}
            />
            <GridItem
              colStart={5}
              rowStart={4}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={6}
              rowStart={4}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['dining-room'].default})`}
            />

            <GridItem
              colStart={2}
              rowStart={5}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              colStart={3}
              rowStart={5}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              colStart={4}
              rowStart={5}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              colStart={5}
              rowStart={5}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              colStart={6}
              rowStart={5}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />

            <GridItem
              colStart={1}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />

            <GridItem
              colStart={2}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['conservatory-room'].default})`}
            />
            <GridItem
              colStart={3}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={4}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['ball-room'].default})`}
            />
            <GridItem
              colStart={5}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              colStart={6}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['kitchen-room'].default})`}
            />

            <GridItem
              colStart={7}
              rowStart={6}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            {[1, 2, 3, 4, 5, 6, 7].map((col) => (
              <GridItem
                colStart={col}
                rowStart={7}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundColor="white"
              />
            ))}

            {/**TODO: create initial positions for characters */}
            {Object.entries(positions).map(([key, pos]) => (
              <Colonel
                key={key}
                id={key}
                initialPos={{ x: pos.x, y: pos.y }}
                movable={key === id.current}
              />
            ))}
          </Grid>
        </GridItem>
        {/*Game Card - TODO: Dropdowns for these should be variables outside of this*/}
        <GridItem colStart={6} colEnd={6} rowStart={1} rowEnd={13}>
          <GameCard />
        </GridItem>

        <GridItem rowStart={11} colStart={2} rowSpan={1} colSpan={4}>
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
