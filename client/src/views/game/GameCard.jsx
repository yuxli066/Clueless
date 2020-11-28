import React from 'react';
import styles from '../css/views.module.css';
import { useContentContext } from '../../ContentProvider';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Icon,
  Checkbox,
  CheckboxGroup,
  HStack,
  Grid,
  Text,
  ButtonGroup,
  Container,
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

const PopOverBody = () => {
  const GameContent = useContentContext().text.Game;
  return (
    <PopoverBody pt={'4em'} pb={'4em'} className={`${styles.cardContainer}`}>
      <Grid
        columnGap={'2ch'}
        rowGap={'2ch'}
        templateColumns={{
          xl: '1fr',
        }}
        templateRows={{
          xl: '100px auto',
        }}
        className={styles.sections}
      >
        <GridItem colStart={1} rowStart={1} colSpan={1}>
          <ButtonGroup size={'xl'}>
            {GameContent['guessTypes'].map((type) => (
              <Button aria-label={type} color="blue.500" p={6} mr={6} fontSize="18px">
                {type}
              </Button>
            ))}
          </ButtonGroup>
        </GridItem>
        {GameContent['weapons'].map((type, index) => (
          <CustomCheckbox value={type} key={index} />
        ))}
        {GameContent['characters'].map((type, index) => (
          <CustomCheckbox value={type} key={index} />
        ))}
      </Grid>
    </PopoverBody>
  );
};

const PopOver = () => {
  return (
    <Container maxW="x3" centerContent>
      <Popover closeOnBlur={true} width={'22em'}>
        <PopoverTrigger>
          <Box
            role="button"
            aria-label="Guess Type"
            p={1}
            w="100px"
            bg="gray.300"
            textAlign="center"
            children="Make a guess"
          />
        </PopoverTrigger>
        <PopoverContent bg="tomato" color="white">
          <PopoverHeader fontWeight="semibold">{'Make a Guess:'}</PopoverHeader>
          <PopoverArrow bg="pink.500" />
          <PopoverCloseButton bg="purple.500" />
          <PopOverBody />
        </PopoverContent>
      </Popover>
    </Container>
  );
};

/** 1. Create a custom icon that accepts 2 props: `isIndeterminate` and `isChecked` */
function CustomIcon(props) {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d = isIndeterminate
    ? 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z'
    : 'M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z';

  return (
    <Icon viewBox="0 0 24 24" {...rest}>
      <path fill="currentColor" d={d} />
    </Icon>
  );
}

function CustomCheckbox(props) {
  return (
    <HStack>
      <CheckboxGroup>
        <Checkbox icon={<CustomIcon />} colorScheme="cyan">
          {props.value}
        </Checkbox>
      </CheckboxGroup>
    </HStack>
  );
}

export default GameCard;
