"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { autoConnect: false });

function MySocket({
  jwtToken,
  websocketKey,
}: {
  jwtToken: string;
  websocketKey: string;
}) {
  const sessionID: string = websocketKey;
  socket.auth = { jwtToken };
  socket.auth = { sessionID };
  socket.connect();
  const [messages, setMessages] = useState([] as string[]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to websocket server");
    });
    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      // localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      // socket.userID = userID;
    });
    // Listen for incoming messages
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };
  return <></>;
}

export default MySocket;
