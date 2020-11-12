import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import SocketContext from "../SocketContext";
import LobbyPlayer from "./LobbyPlayer";
// import { Button, Card } from "@blueprintjs/core";
// import { INTENT_PRIMARY } from "@blueprintjs/core/lib/esm/common/classes";

export default function GameLobby() {
  const socket = useContext(SocketContext);
  const [connectedPlayers, setConnectedPlayers] = useState({});
  const [tmp, settmp] = useState(0);

  // TODO remove this!
  useEffect(() => {
    console.log(socket);
    console.log(socket.id);
  });

  // TODO we should just listen for the message type we need for the lobby. the room was established in the session component!
  useEffect(() => {
    // TODO is just using the setter here directly safe?
    socket.on("playerList", setConnectedPlayers);

    return () => socket.off("playerList", setConnectedPlayers);
  }, [socket]);

  return (
    // TODO blueprint or bootstrap?
    <Card className="text-center">
      <Card.Body>
        {/* TODO make the title bigger! (currently h1's css seems to make things slightly off-center) */}
        <Card.Title>Game Lobby</Card.Title>
        {/* TODO add in connected player list */}
        <ListGroup>
          {/* TODO based off the player list! */}
          <ListGroup.Item>
            <LobbyPlayer name="Colonel Mustard" self />
          </ListGroup.Item>
        </ListGroup>
        <Card.Text>Get 3-5 friends to join this lobby to start!</Card.Text>
        <Button onClick={() => settmp(tmp + 1)}>Start the Game!</Button>
      </Card.Body>
    </Card>
  );
}
