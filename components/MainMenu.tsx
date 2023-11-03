"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";

export default function MainMenu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="navbar-toggler" onClick={handleShow}>
        <span className="navbar-toggler-icon"></span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Main Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <Button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>{" "}
    </>
  );
}
