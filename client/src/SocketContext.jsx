import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import io from "socket-io-client";

const SocketContext = createContext();

// SocketGate is used to provide a "waiting for connection" type page until the WS connects
export function SocketGate({ loading, children }) {
  const socket = useContext(SocketContext);

  // if the socket context is "falsey", return a loading component instead
  if (!socket) {
    return React.createElement(loading);
  }

  return children;
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  // TODO include port resolution logic; if (dev)?

  // default url is window.location
  useEffect(() => {
    const socket = io();
    // TODO log connection to socket?
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      return socket.close();
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketContext;
