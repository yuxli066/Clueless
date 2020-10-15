import { useContext } from "react";
import SocketContext from "./SocketContext";

export default function useSocket() {
  const socket = useContext(SocketContext);

  // TODO callback logic: i.e. provide a way for us to pass in a handler based on a message type that comes in for the socket

  return socket;
}
