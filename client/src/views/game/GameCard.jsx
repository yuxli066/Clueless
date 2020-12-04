import { React, useState } from 'react';
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
  const handleSubmitAccusation = (e) => {
    alert(`placeholder`);
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
              <p>Dr Orchid</p>
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
                <select defaultValue={'DEFAULT'}>
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
                <select defaultValue={'DEFAULT'}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="candlestick">Candlestick</option>
                  <option value="daggerKnife">Dagger/Knife</option>
                  <option value="lead Pipe">Lead Pipe</option>
                  <option value="revolverColt">Revolver/Colt</option>
                  <option value="rope">Rope</option>
                  <option value="spannerMonkeyWrench">Spanner/Monkey Wrench</option>
                </select>
              </div>
            </label>
            <br />
            {/*Dropdown for room TODO: This should be current room that the player is in*/}
            <label>
              <Text fontSize="md">Room</Text>
              <br />
              <div>
                <select defaultValue={'DEFAULT'}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="hall">Hall</option>
                  <option value="ballroom">Ballroom</option>
                  <option value="conservatory">Conservatory</option>
                  <option value="diningRoom">Dining Room</option>
                  <option value="billardRoom">Billard Room</option>
                  <option value="library">Library</option>
                  <option value="lounge">Lounge</option>
                  <option value="study">Study</option>
                </select>
              </div>
            </label>
            <br />
            {/*Dropdown for player*/}
            <label>
              <Text fontSize="md">Player</Text>
              <br />
              <div>
                <select defaultValue={'DEFAULT'}>
                  <option value="DEFAULT">Choose an item...</option>
                  <option value="missScarlett">Miss Scarlett</option>
                  <option value="professorPlum">Professor Plum</option>
                  <option value="mrsPeacock">Mrs Peacock</option>
                  <option value="reverendGreen">Reverend Green</option>
                  <option value="colonelMustard">Colonel Mustard</option>
                  <option value="drOrchid">Dr Orchid</option>
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
