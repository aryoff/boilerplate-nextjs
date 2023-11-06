import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default async function SignInPage(props: Readonly<Props>) {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    redirect("/");
  }
  return (
    <Login
      error={props.searchParams?.error}
      callbackUrl={props.searchParams?.callbackUrl}
    />
  );
}
