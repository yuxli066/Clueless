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
} from '@chakra-ui/react';

function GameCard() {
  return (
    <div className={styles.card}>
      <Text textStyle="paragraph"> Game Card </Text>
      <Text textStyle="paragraph"> Name </Text>
      <PopOver />
    </div>
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
