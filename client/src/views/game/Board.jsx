import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
import clue_board from '../../images/custom_game_board.png';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Card, Elevation } from '@blueprintjs/core';

export default function Board() {
  // TODO we can inline this var if we want!
  // using useMemo so that eslint is happy
  const initialLocation = useMemo(() => ({ x: Math.random() * 700, y: Math.random() * 600 }), []);
  const id = useRef(undefined);
  const [positions, setPositions] = useState({ temp_initial: initialLocation });

  const positionRef = useRef(positions);
  useEffect(() => {
    positionRef.current = positions;
  }, [positions]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('newPlayer', initialLocation);
  }, [socket, initialLocation]);

  // use of useCallback here allows for these messages to only be registered once to the websocket
  const handleResponse = useCallback((resp) => console.log('Response from server: ', resp), []);

  const handlePosition = useCallback((pos) => {
    console.log('Changed Position!', pos);
    setPositions(pos);
  }, []);

  const handleId = useCallback((clientId) => {
    id.current = clientId;
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);
    socket.on('playerMoved', handlePosition);
    socket.on('clientId', handleId);

    // make sure to un-register ourselves when we unmount!
    return () => {
      socket.off('response', handleResponse);
      socket.off('playerMoved', handlePosition);
      socket.off('clientId', handleId);
    };
  }, [socket, handlePosition, handleResponse, handleId]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <figure>
              <img src={clue_board} className="board" />
              <Colonel />
            </figure>
          </Col>
          {/*Game Card - TODO: Dropdowns for these should be variables outside of this*/}
          <Col md={3}>
            <Card
              className="card"
              interactive={true}
              elevation={Elevation.TWO}
              style={{ color: 'rgb(206, 217, 224)', width: 'fit-content', height: 598 }}
            >
              {/*Dropdown for suggestion or accusation*/}
              <p style={{ textAlign: 'center' }}> Game Card </p>
              <label className="pt-label .modifier" style={{ marginLeft: 10, color: 'black' }}>
                Guess Type
                <div class="pt-select">
                  <select>
                    <option selected>Choose an item...</option>
                    <option value="1">Suggestion</option>
                    <option value="2">Accusation</option>
                  </select>
                </div>
              </label>
              {/*Dropdown for weapon*/}
              <label className="pt-label .modifier" style={{ marginLeft: 10, color: 'black' }}>
                Weapon
                <div class="pt-select">
                  <select>
                    <option selected>Choose an item...</option>
                    <option value="1">Candlestick</option>
                    <option value="2">Dagger/Knife</option>
                    <option value="3">Lead Pipe</option>
                    <option value="4">Revolver/Colt</option>
                    <option value="5">Rope</option>
                    <option value="6">Spanner/monkey wrench</option>
                  </select>
                </div>
              </label>

              {/*Dropdown for room TODO: This should be current room that the player is in*/}
              <label className="pt-label .modifier" style={{ marginLeft: 10, color: 'black' }}>
                Room
                <div class="pt-select">
                  <select>
                    <option selected>Choose an item...</option>
                    <option value="1">Kitchen</option>
                    <option value="2">Hall</option>
                    <option value="3">Ballroom</option>
                    <option value="4">Conservatory</option>
                    <option value="5">Dining Room</option>
                    <option value="6">Cellar</option>
                    <option value="7">Billard Room</option>
                    <option value="8">Library</option>
                    <option value="9">Lounge</option>
                    <option value="9">Study</option>
                  </select>
                </div>
              </label>
              {/*Dropdown for player*/}
              <label className="pt-label .modifier" style={{ marginLeft: 10, color: 'black' }}>
                Player
                <div class="pt-select">
                  <select>
                    <option selected>Choose an item...</option>
                    <option value="1">Miss Scarlett</option>
                    <option value="2">Professor Plum</option>
                    <option value="3">Mrs Peacock</option>
                    <option value="4">Reverend Green</option>
                    <option value="5">Colonel Mustard</option>
                    <option value="6">Dr Orchid</option>
                  </select>
                </div>
              </label>

              <br />
              <Button style={{ marginLeft: 70 }}>Submit</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
