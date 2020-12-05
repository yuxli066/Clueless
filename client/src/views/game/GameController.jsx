import React from 'react';
import Board from './Board';

function GameController(props) {
  return (
    <div className="innerContainer">
      <Board playerMap={props.playerMap} />
    </div>
  );
}

export default GameController;
