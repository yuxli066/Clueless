import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { useToast, Grid, GridItem, Center, Divider } from '@chakra-ui/react';
import GameCard from './GameCard';
import Players from './Players';
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

  //TODO: This needs to be recieved from lobby
  const connectedPlayers = [
    {
      id: 1,
      name: 'Colonel Mustard',
    },
    {
      id: 2,
      name: 'Rev. Green',
    },
    {
      id: 3,
      name: 'Professor Plum',
    },
    {
      id: 4,
      name: 'Miss Scarlet',
    },
    {
      id: 5,
      name: 'Mrs. Peacock',
    },
    {
      id: 6,
      name: 'Mrs. White',
    },
  ];

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
      <Grid templateRows="repeat(12, 63px)" templateColumns="repeat(6, 1fr)" w="100%" h="100%">
        <GridItem rowSpan={13} colSpan={1}>
          <div> Nav Bar Goes Here</div>
        </GridItem>
        <GridItem rowSpan={2} colSpan={4}>
          <div
            style={{ backgroundColor: '#fcfbf5', width: '100%', height: '100%', borderRadius: 12 }}
          >
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(6, 1fr)" w="100%" h="100%">
              {connectedPlayers.map((player) => (
                <GridItem rowSpan={1} colSpan={1} key={player.id} style={{ textAlign: 'center' }}>
                  <Center>
                    <Players name={player.name} self={player.id === socket.id} />
                  </Center>
                </GridItem>
              ))}
            </Grid>
          </div>
        </GridItem>
        <GridItem rowSpan={8} colSpan={4}>
          <div
            style={{
              backgroundImage: `url(${Content.images['custom_game_board'].default})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
            }}
          >
            {/* <img src={clue_board} className="board" /> */}
            {Object.entries(positions).map(([key, pos]) => (
              <Colonel
                key={key}
                id={key}
                initialPos={{ x: pos.x, y: pos.y }}
                movable={key === id.current}
              />
            ))}
          </div>
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
