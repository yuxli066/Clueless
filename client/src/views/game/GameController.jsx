import React, { useContext, useEffect } from 'react';
import SocketContext from '../../SocketContext';
import Board from './Board';

function GameController({ playerMap, yourself }) {
  // const socket = useContext(SocketContext);
  // useEffect(() => {
  //   socket.emit('requestGameStart', '0');
  // });

  return (
    <div className="innerContainer">
      <Board playerMap={playerMap} />
    </div>
  );
}

export default GameController;
