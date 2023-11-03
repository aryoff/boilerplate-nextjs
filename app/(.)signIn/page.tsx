"use client";
import Login from "@/components/Login";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInIntercept = (props: Props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Sign In Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login
          modal={true}
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SignInIntercept;
