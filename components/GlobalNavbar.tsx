import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import MainMenu from "./MainMenu";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
const Chat = dynamic(() => import("./Chat"), { ssr: false });

type Props = {
  title: string;
  session: Session | null;
  jwtToken: string;
};

export default async function GlobalNavbar(props: Readonly<Props>) {
  let authAction;
  if (props.session !== null) {
    authAction = (
      <div className="justify-content-end">
        <Stack direction="horizontal" gap={3}>
          <Chat
            jwtToken={props.jwtToken}
            sessionID={props.session?.user.websocketKey}
          />
          <MainMenu />
        </Stack>
      </div>
    );
  } else {
    authAction = (
      <Link className="btn btn-primary" href={"/signIn"}>
        Sign In
      </Link>
    );
  }
  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Link className="navbar-brand" href={"/"}>
          {props.title}
        </Link>
        {authAction}
      </Container>
    </Navbar>
  );
}
