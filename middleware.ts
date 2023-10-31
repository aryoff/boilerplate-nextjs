export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!about|contact|signIn).{1,})", "/app/:path*"],
};
