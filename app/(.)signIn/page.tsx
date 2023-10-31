import Login from "@/components/Login";
import React from "react";
import Modal from "react-bootstrap/Modal";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const signInIntercept = (props: Props) => {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Sign In Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </Modal.Body>
    </Modal>
  );
};

export default signInIntercept;
