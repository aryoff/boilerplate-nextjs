import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Stack } from "react-bootstrap";
import MainMenu from "./MainMenu";
import dynamic from "next/dynamic";
const Chat = dynamic(() => import("./Chat"), { ssr: false });

export default async function GlobalNavbar({
  title,
}: Readonly<{ title: string }>) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("next-auth.session-token");
  const session = await getServerSession(authOptions);
  const sessionID = session?.user.websocketKey;
  let authAction;
  if (session !== null) {
    authAction = (
      <div className="justify-content-end">
        <Stack direction="horizontal" gap={3}>
          <Chat jwtToken={jwtToken?.value as string} sessionID={sessionID} />
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
          {title}
        </Link>
        {authAction}
      </Container>
    </Navbar>
  );
}
