import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import clue_board from '../../images/clue_board.jpg';
import Colonel from './Colonal';
import SocketContext from '../../../src/SocketContext';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Card, Elevation } from '@blueprintjs/core';

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
          {/*Game Card - TODO: Dropdowns for these should be variables outside of this*/}
          <Col md={3}>
            <Card
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
