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
        <GridItem rowSpan={2} colSpan={4}>
          <div
            style={{ backgroundColor: '#fcfbf5', width: '100%', height: '100%', borderRadius: 12 }}
          >
            Players go here
          </div>
        </GridItem>
        <GridItem rowSpan={8} colSpan={4}>
          <Grid
            backgroundColor="white"
            templateRows="repeat(5, 200px)"
            templateColumns="repeat(5, 1fr)"
            w="100%"
            h="100%"
          >
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['study-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['hall-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['lounge-room'].default})`}
            />

            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />

            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['library-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['billiards-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['dining-room'].default})`}
            />

            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="white"
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['vertical-hall'].default})`}
            />

            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['conservatory-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['ball-room'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['horizontal-hall'].default})`}
            />
            <GridItem
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundImage={`url(${Content.images['kitchen-room'].default})`}
            />
          </Grid>
        </GridItem>
        {/*Game Card - TODO: Dropdowns for these should be variables outside of this*/}
        <GridItem colStart={6} colEnd={6} rowStart={1} rowEnd={13}>
          <GameCard />
        </GridItem>

        <GridItem rowSpan={2} colSpan={4}>
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

/*
<div
style={{
  backgroundImage: `url(${Content.images['custom_game_board'].default})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
}}
>
{Object.entries(positions).map(([key, pos]) => (
  <Colonel
    key={key}
    id={key}
    initialPos={{ x: pos.x, y: pos.y }}
    movable={key === id.current}
  />
))}
</div>
*/

/* Need to generate initial positions on board for characters */
