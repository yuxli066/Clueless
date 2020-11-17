import React from 'react';
import Board from './Board';
import { Container } from 'react-bootstrap';

function GameController() {
  return (
    <Container fluid className="innerContainer">
      <Board />
    </Container>
  );
}

export default GameController;
