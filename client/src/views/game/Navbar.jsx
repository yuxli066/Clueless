import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useContentContext } from '../../ContentProvider.jsx';
import * as contentHelpers from '../content';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure,
  Divider,
  Center,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Grid,
} from '@chakra-ui/react';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = React.useRef();
  const Content = useContentContext();

  return (
    <>
      <Button bg="rgb(255, 253, 235)" onClick={onOpen} width="100%" h="100%">
        <Center> GAME MENU </Center>
      </Button>
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen} zIndex={1}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Center>GAME MENU</Center>
            </DrawerHeader>
            <DrawerBody>
              <Popover>
                <PopoverTrigger>
                  <Button size="md" height="4em" width="100%" mb="1em" mt="1em">
                    HOME
                  </Button>
                </PopoverTrigger>
                <div id="popover1">
                  <PopoverContent color="white" bg="red.800" borderColor="blue.800">
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      Are you sure?
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      You will not be able to rejoin the same game once you quit!
                    </PopoverBody>
                    <PopoverFooter
                      border="0"
                      d="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      pb={4}
                    >
                      <ButtonGroup size="sm">
                        <Link as={ReactLink} to="/" style={{ textDecoration: 'none' }}>
                          <Button bg="red.500">Yes, I'm sure</Button>
                        </Link>
                        <Button colorScheme="green" ref={initialFocusRef} onClick={onClose}>
                          No, I want to keep playing
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </div>
              </Popover>
              <Divider orientation="horizontal" />
              <Popover>
                <PopoverTrigger>
                  <Button size="md" height="4em" width="100%" mt="1em" mb="1em">
                    GAME RULES
                  </Button>
                </PopoverTrigger>
                <div id="popover2">
                  <PopoverContent color="white" bg="green.500" borderColor="blue.800">
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      <Center>RULES FOR THE GAME:</Center>
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody fontSize="xl">
                      <Grid templateColumns="1fr 1fr">
                        <contentHelpers.ColText
                          content={{
                            colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
                            text: Content.text['Instructions1'],
                          }}
                        />
                        <contentHelpers.ColText
                          content={{
                            colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
                            text: Content.text['Instructions2'],
                          }}
                        />
                        <contentHelpers.ColText
                          content={{
                            colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
                            text: Content.text['Instructions4'],
                          }}
                        />
                        <contentHelpers.ColText
                          content={{
                            colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
                            text: Content.text['Instructions5'],
                          }}
                        />
                        <contentHelpers.ColText
                          content={{
                            colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
                            text: Content.text['Instructions6'],
                          }}
                        />
                        {/* add more game rule content here*/}
                      </Grid>
                    </PopoverBody>
                  </PopoverContent>
                </div>
              </Popover>
              <Divider orientation="horizontal" />
              <Popover>
                <PopoverTrigger>
                  <Button size="md" height="4em" width="100%" mt="1em" bg="red.300">
                    END GAME
                  </Button>
                </PopoverTrigger>
                <PopoverContent color="white" bg="red.800" borderColor="blue.800">
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Are you sure?
                  </PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    You will not be able to rejoin the same game once you quit!
                  </PopoverBody>
                  <PopoverFooter
                    border="0"
                    d="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={4}
                  >
                    <ButtonGroup size="sm">
                      <Link as={ReactLink} to="/" style={{ textDecoration: 'none' }}>
                        <Button bg="red.500">Yes, I'm sure</Button>
                      </Link>
                      <Button colorScheme="green" ref={initialFocusRef} onClick={onClose}>
                        No, I want to keep playing
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Navbar;
