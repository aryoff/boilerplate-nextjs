import React from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import { metadata } from "./layout";

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalNavbar title={metadata.title as string} />
      <div>{children}</div>
    </>
  );
}
