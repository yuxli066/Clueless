import { React, useContext, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Text,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import SocketContext from '../../SocketContext';

function GameCard() {
  const [guessType, setGuessType] = useState('DEFAULT');
  const [weapon, setWeapon] = useState('DEFAULT');
  const [room, setRoom] = useState('DEFAULT');
  const [player, setPlayer] = useState('DEFAULT');
  const socket = useContext(SocketContext);

  const handleSubmitAccusation = (_) => {
    console.log(guessType);
    console.log(room);
    socket.emit(guessType, {
      weapon,
      room,
      player,
    });
  };

  return (
    <Tabs
      isFitted
      variant="enclosed"
      style={{
        background: '#fffdeb',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 12,
      }}
    >
      <TabList mb="1em">
        <Tab>Game Card</Tab>
        <Tab>Suggestion/Accusation</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid templateRows="repeat(24, 0.55fr)" templateColumns="repeat(2, 1fr)">
            <GridItem
              rowSpan={1}
              colSpan={2}
              style={{ backgroundColor: '#fff6bf', borderRadius: 6 }}
            >
              <Text as="u" fontSize="md">
                Suspects
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Miss Scarlett</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Professor Plum</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Mrs Peacock</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Reverend Green</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Colonel Mustard</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Mrs. White</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              style={{ backgroundColor: '#fff6bf', borderRadius: 6 }}
            >
              <Text as="u" fontSize="md">
                Weapons
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Candlestick</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Dagger/Knife</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Lead Pipe</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Revolver/Colt</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Rope</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Spanner/monkey wrench</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              style={{ backgroundColor: '#fff6bf', borderRadius: 6 }}
            >
              <Text as="u" fontSize="md">
                Rooms
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Kitchen</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Hall</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Ballroom</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Conservatory</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Dining Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Billard Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Library</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Lounge</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Study</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
          </Grid>
        </TabPanel>
        <TabPanel>
          <div style={{ textAlign: 'left' }}>
            {/*Dropdown for suggestion or accusation*/}
            <label>
              <Text fontSize="md">Guess Type</Text>
              <br />
              <div>
                <select value={guessType} onChange={(e) => setGuessType(e.target.value)}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="accusation">Accusation</option>
                </select>
              </div>
            </label>
            <br />
            {/*Dropdown for weapon*/}
            <label>
              <Text fontSize="md">Weapon</Text>
              <br />
              <div>
                <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="Candle Stick">Candlestick</option>
                  <option value="Knife">Dagger/Knife</option>
                  <option value="Lead Pipe">Lead Pipe</option>
                  <option value="Revolver">Revolver/Colt</option>
                  <option value="Rope">Rope</option>
                  <option value="Wrench">Spanner/Monkey Wrench</option>
                </select>
              </div>
            </label>
            <br />
            {/*Dropdown for room TODO: This should be current room that the player is in*/}
            <label>
              <Text fontSize="md">Room</Text>
              <br />
              <div>
                <select value={room} onChange={(e) => setRoom(e.target.value)}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Hall">Hall</option>
                  <option value="Ballroom">Ballroom</option>
                  <option value="Conservatory">Conservatory</option>
                  <option value="Dining">Dining Room</option>
                  <option value="Billiards">Billard Room</option>
                  <option value="Library">Library</option>
                  <option value="Lounge">Lounge</option>
                  <option value="Study">Study</option>
                </select>
              </div>
            </label>
            <br />
            {/*Dropdown for player*/}
            <label>
              <Text fontSize="md">Player</Text>
              <br />
              <div>
                {/* TODO consider moving these to handling just players */}
                <select value={player} onChange={(e) => setPlayer(e.target.value)}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="Miss Scarlett">Miss Scarlett</option>
                  <option value="Professor Plum">Professor Plum</option>
                  <option value="Mrs. Peacock">Mrs Peacock</option>
                  <option value="Rev. Green">Reverend Green</option>
                  <option value="Colonel Mustard">Colonel Mustard</option>
                  <option value="Mrs. White">Mrs. White</option>
                </select>
              </div>
            </label>
          </div>
          <br />
          <Button style={{ textAlign: 'center' }} onClick={handleSubmitAccusation}>
            Submit
          </Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GameCard;
