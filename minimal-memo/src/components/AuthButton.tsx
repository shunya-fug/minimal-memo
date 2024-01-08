"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <button
      className="btn"
      onClick={() => (session ? signOut() : signIn(undefined, { callbackUrl: "http://localhost:3000/login/complete" }))}
    >
      {session ? "Sign out" : "Sign in"}
    </button>
  );
}
