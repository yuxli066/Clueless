import React from 'react';
import styles from './css/views.module.css';
import * as sections from './sections';
import {Button, Container, useColorMode, useColorModeValue} from '@chakra-ui/react';

function LandingPage() {
  const bg = useColorModeValue("tan.50", "black.50");
  const color = useColorModeValue("black.900", "black.900");
  const { toggleColorMode } = useColorMode();
  return (
    <Container className={styles.innerContainer} bg={bg} color={color}>
      <Button bg={bg} color={color} size="sm" onClick={toggleColorMode}>
        Change Paper Color
      </Button>
      <sections.HeaderSection />
      <sections.LandingSection />
      <sections.SuspectsSection />
      <sections.HowToPlaySection />
      <sections.FooterSection />
    </Container>
  );
}

export default LandingPage;
