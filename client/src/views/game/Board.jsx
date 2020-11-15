import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import clue_board from '../../images/clue_board.jpg';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { Container, Row, Col } from 'react-bootstrap';

export default function Board() {
  // TODO we can inline this var if we want!
  const initialLocation = { x: Math.random() * 700, y: Math.random() * 600 };
  // const id = useRef(undefined);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });

  const positionRef = useRef(positions);
  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

  socket.on('response', (resp) => {
    console.log('Response from server: ', resp);
  });

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => console.log('Response from server: ', resp), []);

  // pos?
  /*
    {
      "id1": {x:0 y: 0}
      "id2": {x:0 y: 0}
    }
    */
  const handlePosition = useCallback((pos) => {
    console.log('Changed Position!', pos);
    setPositions(pos);
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
    };
  }, [socket, handlePosition, handleResponse]);

  // socket.on('playerMoved', (playerInfo) => {
  //   playerInfo.handlePosition(playerInfo.x, playerInfo.y);
  // });
  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <div
              style={{
                backgroundImage: `url(${clue_board})`,
                height: 600,
                width: 715,
              }}
            >
              {/* TODO update movable with an id check as was done before! */}
              {Object.entries(positions).map(([key, pos]) => {
                console.log('key here is: ', key);
                console.log('pos here is:', pos);
                return (
                  <Colonel key={key} id={key} initialPos={{ x: pos.x, y: pos.y }} movable={true} />
                );
              })}
            </div>
          </Col>

          <Col md={3}>
            <div style={{ color: '#CED9E0', textAlign: 'center' }}>
              <p> Game Card </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
