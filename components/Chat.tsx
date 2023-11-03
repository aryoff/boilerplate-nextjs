"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Nav, Offcanvas } from "react-bootstrap";

const socket = io("http://localhost:3001", { autoConnect: false });

export default function Chat({
  jwtToken,
  sessionID,
}: Readonly<{
  jwtToken: string;
  sessionID?: string;
}>) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("chat");

  socket.auth = { jwtToken, sessionID };
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

  return (
    <>
      <Nav.Link href={"#"} onClick={handleShow}>
        <i className="far fa-comments position-relative">
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            3<span className="visually-hidden">unread messages</span>
          </span>
        </i>
      </Nav.Link>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>{" "}
    </>
  );
}
