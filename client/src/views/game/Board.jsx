import React, { useEffect, useState, useContext, useCallback } from 'react';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { useToast, Grid, GridItem, Center, Button, Input } from '@chakra-ui/react';
import GameCard from './GameCard';
import Players from './Players';
import Deck from './Deck';
import { useDrop } from 'react-dnd';
import { useContentContext } from '../../ContentProvider';
import white from '../../board-images/white-image.PNG';
import { ItemTypes } from './ItemTypes';
// import Navbar from './Navbar';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

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

const hallways = [
  '[2,5]',
  '[2,3]',
  '[3,6]',
  '[3,4]',
  '[3,2]',
  '[4,5]',
  '[4,3]',
  '[5,6]',
  '[5,4]',
  '[5,2]',
  '[6,5]',
  '[6,3]',
];
const getlocationname = (coordinates) => {
  switch (JSON.stringify(coordinates)) {
    case '[2,2]':
      return 'Study';
    case '[4,2]':
      return 'Hall';
    case '[6,2]':
      return 'Lounge';
    case '[2,4]':
      return 'Library';
    case '[4,4]':
      return 'Billiards';
    case '[6,4]':
      return 'Dining';
    case '[2,6]':
      return 'Conservatory';
    case '[4,6]':
      return 'Ballroom';
    case '[6,6]':
      return 'Kitchen';
    default:
      return `Hallway ${hallways.indexOf(JSON.stringify(coordinates)) + 1}`;
  }
};
const getcoordinate = (locationName) => {
  switch (locationName) {
    case 'Study':
      return [2, 2];
    case 'Hall':
      return [4, 2];
    case 'Lounge':
      return [6, 2];
    case 'Library':
      return [2, 4];
    case 'Billiards':
      return [4, 4];
    case 'Dining':
      return [6, 4];
    case 'Conservatory':
      return [2, 6];
    case 'Ballroom':
      return [4, 6];
    case 'Kitchen':
      return [6, 6];
    default:
      return JSON.parse(hallways[Number(locationName.match(/\d+/gm)[0]) - 1]);
  }
};

export default function Board({ playerMap }) {
  // using useMemo so that eslint is happy
  const Content = useContentContext();
  const showToast = useToast();

  const socket = useContext(SocketContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  /* states */
  const [loading, setIsLoading] = useState(true);
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const [clientId, setClientId] = useState(undefined);
  const [disproval, setDisproval] = useState('None');

  var playerDeck = [];

  const getPlayerImage = (playerName) => {
    switch (playerName) {
      case 'Mrs. Peacock':
        return Content.images['MrsPeacock'].default;
      case 'Colonel Mustard':
        return Content.images['ColonelMustard'].default;
      case 'Rev. Green':
        return Content.images['RevGreen'].default;
      case 'Professor Plum':
        return Content.images['ProfPlum'].default;
      case 'Miss Scarlet':
        return Content.images['MissScarlett'].default;
      case 'Mrs. White':
        return Content.images['MrsWhite'].default;
      default:
        break;
    }
  };

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

  const handleSugg = useCallback(
    (resp) => {
      console.log('Guess Was:', resp);
      const descript =
        'A suggestion was made. ' +
        resp.player +
        ' killed in the ' +
        resp.room +
        ' with a ' +
        resp.weapon +
        '. Please click the button to disprove.';
      showToast({
        description: descript,
        isClosable: true,
        position: 'top',
        status: 'success',
      });
    },
    [showToast],
    //Can't seem to get this to work. Open modal after recieving sugg
    //openModal(),
  );

  const handleAcc = useCallback(
    (resp) => {
      console.log('Guess Was:', resp);
      const descript =
        'An accusation was made. ' +
        resp.player +
        ' killed in the ' +
        resp.room +
        ' with a ' +
        resp.weapon +
        '. Please click the button to disprove.';
      showToast({
        description: descript,
        isClosable: true,
        position: 'top',
        status: 'success',
      });
    },
    [showToast],
    //Can't seem to get this to work. Open modal after recieving acc
    //openModal(),
  );

  //Havent gotten this to open modal yet
  // const openModal = useDisclosure(isOpen);

  const handleDisproval = (_) => {
    console.log(disproval);
    //socket.emit(disproval, {
    //  card,
    //player,
    //});
  };

  const handlePosition = useCallback(
    (movementData) => {
      let newConnectedPlayers = [...connectedPlayers];
      newConnectedPlayers.find(
        (p) => p.playaInformation.id === movementData.id,
      ).playaInformation.initPosition = getcoordinate(movementData.pos);
      setConnectedPlayers(newConnectedPlayers);
    },
    [connectedPlayers],
  );

  const handleClientId = useCallback((id) => {
    console.log('Client ID is: ' + id);
    setClientId(id);
  }, []);

  useEffect(() => {
    setConnectedPlayers(playerMap);
  }, [playerMap]);

  useEffect(() => {
    if (connectedPlayers && clientId) setIsLoading(false);
  }, [connectedPlayers, clientId]);

  useEffect(() => {
    if (connectedPlayers) {
      socket.emit('board', connectedPlayers);
    }
  }, [connectedPlayers, socket]);

  useEffect(() => {
    socket.on('clientId', handleClientId);
    socket.on('playerMoved', handlePosition);
    socket.on('notification', handleMessageResponse);
    socket.on('suggestion', handleSugg);
    socket.on('accusation', handleAcc);
    return () => {
      socket.off('playerMoved');
      socket.off('notification');
      socket.off('clientId');
      socket.off('suggestion');
      socket.off('accusation');
    };
  }, [socket, handlePosition, handleMessageResponse, handleClientId, handleSugg, handleAcc]);

  console.log('connected players ->', connectedPlayers);

  // render all players
  const renderClient = (x, y) => {
    let allPlayers = [];
    for (let player of connectedPlayers) {
      const [playerX, playerY] = player.playaInformation.initPosition;

      if (player.playaInformation.id === clientId) {
        playerDeck = player.playaInformation.playerDeck;
        console.log('player deck', playerDeck);
      }

      let playerExists = x === playerX && y === playerY;
      if (playerExists) {
        const playerMovable = player.playaInformation.id === clientId;
        const atStartingPosition =
          JSON.stringify(getInitialLocation(player.playaInformation.name)) ===
          JSON.stringify(player.playaInformation.initPosition)
            ? true
            : false;
        allPlayers.push(
          <Colonel
            playerIcon={getPlayerImage(player.playaInformation.name)}
            id={player.playaInformation.id}
            colStart={playerX}
            rowStart={playerY}
            key={player.playaInformation.id}
            movable={playerMovable}
            atStartingLocation={atStartingPosition}
          />,
        );
      }
    }
    return allPlayers;
  };

  return loading ? (
    <div>Loading Board...</div>
  ) : (
    <div>
      <Grid templateRows="repeat(12, 1fr)" templateColumns="repeat(6, 1fr)" w="100%" h="100%">
        {/* <GridItem rowSpan={1} colSpan={1}>
          <Navbar />
        </GridItem> */}
        <GridItem rowSpan={13} colSpan={1} rowStart={1} colStart={1}>
          <Button onClick={onOpen}> DISPROVE (AUTOMATE)</Button>
        </GridItem>
        <GridItem rowSpan={12} colSpan={1} rowStart={2} />
        <GridItem rowSpan={1} colSpan={4} rowStart={1} colStart={2}>
          <div
            style={{ backgroundColor: '#fcfbf5', width: '100%', height: '100%', borderRadius: 12 }}
          >
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(6, 1fr)" w="100%" h="100%">
              {/* TODO move to connectedplayers (coming from the server) */}
              {connectedPlayers.map((player) => (
                <GridItem rowSpan={1} colSpan={1} key={player.id} style={{ textAlign: 'center' }}>
                  <Center>
                    <Players name={player.playaInformation.name} self={player.id === socket.id} />
                  </Center>
                </GridItem>
              ))}
            </Grid>
          </div>
        </GridItem>
        <GridItem padding="2em" rowSpan={8} colSpan={4} rowStart={2} colStart={2}>
          <Grid
            backgroundColor="white"
            templateRows="10% repeat(5, 200px) 10%"
            templateColumns="10% repeat(5, 1fr) 10%"
            w="100%"
            h="100%"
          >
            <RoomHallway colStart={7} rowStart={3} cell="starting">
              {renderClient(7, 3)}
            </RoomHallway>
            <RoomHallway colStart={3} rowStart={7} cell="starting">
              {renderClient(3, 7)}
            </RoomHallway>
            <RoomHallway colStart={1} rowStart={3} cell="starting">
              {renderClient(1, 3)}
            </RoomHallway>
            <RoomHallway colStart={5} rowStart={1} cell="starting">
              {renderClient(5, 1)}
            </RoomHallway>
            <RoomHallway colStart={1} rowStart={5} cell="starting">
              {renderClient(1, 5)}
            </RoomHallway>
            <RoomHallway colStart={5} rowStart={7} cell="starting">
              {renderClient(5, 7)}
            </RoomHallway>

            <RoomHallway colStart={2} rowStart={2} imageUrl={Content.images['study-room'].default}>
              {renderClient(2, 2)}
            </RoomHallway>
            <RoomHallway
              colStart={3}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(3, 2)}
            </RoomHallway>
            <RoomHallway colStart={4} rowStart={2} imageUrl={Content.images['hall-room'].default}>
              {renderClient(4, 2)}
            </RoomHallway>
            <RoomHallway
              colStart={5}
              rowStart={2}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(5, 2)}
            </RoomHallway>
            <RoomHallway colStart={6} rowStart={2} imageUrl={Content.images['lounge-room'].default}>
              {renderClient(6, 2)}
            </RoomHallway>
            <RoomHallway
              colStart={2}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(2, 3)}
            </RoomHallway>
            <EmptySpace colStart={3} rowStart={3} />
            <RoomHallway
              colStart={4}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(4, 3)}
            </RoomHallway>
            <EmptySpace colStart={5} rowStart={3} />
            <RoomHallway
              colStart={6}
              rowStart={3}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(6, 3)}
            </RoomHallway>
            <RoomHallway
              colStart={2}
              rowStart={4}
              imageUrl={Content.images['library-room'].default}
            >
              {renderClient(2, 4)}
            </RoomHallway>
            <RoomHallway
              colStart={3}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(3, 4)}
            </RoomHallway>
            <RoomHallway
              colStart={4}
              rowStart={4}
              imageUrl={Content.images['billiards-room'].default}
            >
              {renderClient(4, 4)}
            </RoomHallway>
            <RoomHallway
              colStart={5}
              rowStart={4}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(5, 4)}
            </RoomHallway>
            <RoomHallway colStart={6} rowStart={4} imageUrl={Content.images['dining-room'].default}>
              {renderClient(6, 4)}
            </RoomHallway>
            <RoomHallway
              colStart={2}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(2, 5)}
            </RoomHallway>
            <EmptySpace colStart={3} rowStart={5} />
            <RoomHallway
              colStart={4}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(4, 5)}
            </RoomHallway>
            <EmptySpace colStart={5} rowStart={5} />
            <RoomHallway
              colStart={6}
              rowStart={5}
              imageUrl={Content.images['vertical-hall'].default}
            >
              {renderClient(6, 5)}
            </RoomHallway>
            <EmptySpace colStart={1} rowStart={6} />
            <RoomHallway
              colStart={2}
              rowStart={6}
              imageUrl={Content.images['conservatory-room'].default}
            >
              {renderClient(2, 6)}
            </RoomHallway>
            <RoomHallway
              colStart={3}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(3, 6)}
            </RoomHallway>
            <RoomHallway colStart={4} rowStart={6} imageUrl={Content.images['ball-room'].default}>
              {renderClient(4, 6)}
            </RoomHallway>
            <RoomHallway
              colStart={5}
              rowStart={6}
              imageUrl={Content.images['horizontal-hall'].default}
            >
              {renderClient(5, 6)}
            </RoomHallway>
            <RoomHallway
              colStart={6}
              rowStart={6}
              imageUrl={Content.images['kitchen-room'].default}
            >
              {renderClient(6, 6)}
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
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(7, 1fr)" w="100%" h="100%">
              {/* TODO move to connectedplayers (coming from the server) */}
              {playerDeck.map((card) => (
                <GridItem rowSpan={1} colSpan={1} key={card.Id} style={{ textAlign: 'center' }}>
                  <Center>
                    <Deck card={card} />
                  </Center>
                </GridItem>
              ))}
            </Grid>
          </div>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>A Suggestion/Accusation was made!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Are you disprove the suggestion/accusation? Type "No" if not. If you can, please type
              in the card name.{' '}
            </p>
            <Input
              placeholder="Ex. Candlestick "
              size="md"
              onChange={(e) => setDisproval(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDisproval}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

const RoomHallway = ({ colStart, rowStart, children, id, imageUrl, cell }) => {
  // eslint-disable-next-line
  // TODO: Add fancy css for isOver and canDrop
  const socket = useContext(SocketContext);
  const handlePlayerMove = (player) => {
    console.log(
      'Player with id: ' + player.id + ' just moved to: ' + getlocationname([colStart, rowStart]),
    );
    socket.emit('playerMovement', { id: player.id, pos: getlocationname([colStart, rowStart]) });
  };
  // eslint-disable-next-line
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    canDrop: () => cell !== 'starting',
    drop: (item, monitor) => handlePlayerMove(item),
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
      backgroundImage={imageUrl ? `url(${imageUrl})` : `url(${white})`}
      opacity={isOver ? 0.5 : 1}
      zIndex={1}
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
