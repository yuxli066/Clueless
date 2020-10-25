import React from "react";
import { useContext } from "react";
import SocketContext from "./SocketContext";

export default function Board() {
  // TODO for now, this is a basic proof-of-concept for the socket
  // in reality, it should show the actual game board!

  const socket = useContext(SocketContext);

  socket.on("response", (resp) => {
    console.log("Response from server: ", resp);
  });

  function sendMessage(e) {
    const message = "Hello from the client!";
    console.log(`Sending the message "${message}" to the server!`);
    socket.emit("greet", message);
  }

  return (
    <div>
      <p>Successfully connected to websockt!</p>
      <p>
        Try sending a message to the server via the button below (make sure to
        look at the browser's console and the server's console!)
      </p>
      <button onClick={sendMessage}>Send a message!</button>
    </div>
  );
}
