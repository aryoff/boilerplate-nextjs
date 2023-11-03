"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
  modal?: boolean;
};

const Login = (props: Props) => {
  const email = useRef("");
  const pass = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: props.callbackUrl ?? "/",
    });
  };
  let button;
  if (props.modal) {
    button = "";
  } else {
    button = (
      <Button variant="danger" href={props.callbackUrl ?? "/"}>
        Cancel
      </Button>
    );
  }
  return (
    <div className={props.className}>
      <div className="tw-text-center">Login Form</div>
      {!!props.error && <p>Authentication failed</p>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => (email.current = e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => (pass.current = e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        {button}
      </Form>
    </div>
  );
};

export default Login;
