import React, { useState } from 'react';
import Container from 'react-bootstrap/cjs/Container';
import Board from './Board';
import Colonal from './Colonal';
function GameController() {
  return (
    <div>
      <Container fluid className="innerContainer">
        <Board />
      </Container>
    </div>
  );
}

export default GameController;
