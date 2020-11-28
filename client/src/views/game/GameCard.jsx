import React from 'react';
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

function GameCard() {
  function handleSubmitAccusation() {
    console.log('temporary!');
  }

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
          <Grid templateRows="repeat(23, 1fr)" templateColumns="repeat(2, 1fr)">
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
              <p>Person</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Person</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Person</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Person</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Person</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Person</p>
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
              <p>Weapon</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Weapon</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Weapon</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Weapon</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Weapon</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Weapon</p>
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
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <p>Room</p>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Checkbox size="md"></Checkbox>
            </GridItem>
          </Grid>
        </TabPanel>
        <TabPanel style={{ textAlign: 'left' }}>
          {/*Dropdown for suggestion or accusation*/}
          <label>
            <Text fontSize="md">Guess Type</Text>
            <br />
            <div>
              <select>
                <option selected>Choose an item...</option>
                <option value="1">Suggestion</option>
                <option value="2">Accusation</option>
              </select>
            </div>
          </label>
          <br />
          {/*Dropdown for weapon*/}
          <label>
            <Text fontSize="md">Weapon</Text>
            <br />
            <div>
              <select>
                <option selected>Choose an item...</option>
                <option value="1">Candlestick</option>
                <option value="2">Dagger/Knife</option>
                <option value="3">Lead Pipe</option>
                <option value="4">Revolver/Colt</option>
                <option value="5">Rope</option>
                <option value="6">Spanner/monkey wrench</option>
              </select>
            </div>
          </label>
          <br />
          {/*Dropdown for room TODO: This should be current room that the player is in*/}
          <label>
            <Text fontSize="md">Room</Text>
            <br />
            <div>
              <select>
                <option selected>Choose an item...</option>
                <option value="1">Kitchen</option>
                <option value="2">Hall</option>
                <option value="3">Ballroom</option>
                <option value="4">Conservatory</option>
                <option value="5">Dining Room</option>
                <option value="6">Cellar</option>
                <option value="7">Billard Room</option>
                <option value="8">Library</option>
                <option value="9">Lounge</option>
                <option value="9">Study</option>
              </select>
            </div>
          </label>
          <br />
          {/*Dropdown for player*/}
          <label>
            <Text fontSize="md">Player</Text>
            <br />
            <div>
              <select>
                <option selected>Choose an item...</option>
                <option value="1">Miss Scarlett</option>
                <option value="2">Professor Plum</option>
                <option value="3">Mrs Peacock</option>
                <option value="4">Reverend Green</option>
                <option value="5">Colonel Mustard</option>
                <option value="6">Dr Orchid</option>
              </select>
            </div>
          </label>

          <br />
          <Button onClick={handleSubmitAccusation}>Submit</Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GameCard;
