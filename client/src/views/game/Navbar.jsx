import React, { useState } from 'react';
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
} from '@chakra-ui/react';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} width="100%" h="8em">
        <Center>GAME MENU </Center>
      </Button>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">GAME MENU</DrawerHeader>
            <DrawerBody>
              <Button size="md" height="48px" width="100%" mb="1em" mt="1em">
                HOME
              </Button>
              <Divider orientation="horizontal" />
              <Button size="md" height="48px" width="100%" mt="1em" mb="1em">
                GAME RULES
              </Button>
              <Divider orientation="horizontal" />
              <Button size="md" height="48px" width="100%" mt="1em" bg="red.300">
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
