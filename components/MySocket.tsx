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
  socket.auth = { jwtToken };
  socket.connect();
  const [messages, setMessages] = useState([] as string[]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to websocket server");
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
