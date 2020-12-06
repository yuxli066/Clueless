import React from 'react';
import Board from './Board';

function GameController({ playerMap, yourself }) {
  return (
    <div className="innerContainer">
      <Board playerMap={playerMap} yourself={yourself} />
    </div>
  );
}

export default GameController;
