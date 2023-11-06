import React from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import { metadata } from "./layout";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jwtToken = cookies().get("next-auth.session-token");
  const session = await getServerSession(authOptions);
  return (
    <>
      <GlobalNavbar
        title={metadata.title as string}
        session={session}
        jwtToken={jwtToken?.value as string}
      />
      <div>{children}</div>
    </>
  );
}
