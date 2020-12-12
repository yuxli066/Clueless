import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
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
  Box,
  Flex,
} from '@chakra-ui/react';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button bg="rgb(255, 253, 235)" onClick={onOpen} width="100%" h="100%">
        <Center> GAME MENU </Center>
      </Button>
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Center>GAME MENU</Center>
            </DrawerHeader>
            <DrawerBody>
              <Link as={ReactLink} to="/" style={{ textDecoration: 'none' }}>
                <Button size="md" height="4em" width="100%" mb="1em" mt="1em">
                  HOME
                </Button>
              </Link>
              <Divider orientation="horizontal" />
              <Button size="md" height="4em" width="100%" mt="1em" mb="1em">
                GAME RULES
              </Button>
              <Divider orientation="horizontal" />
              <Button size="md" height="4em" width="100%" mt="1em" bg="red.300">
                END GAME
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Navbar;
