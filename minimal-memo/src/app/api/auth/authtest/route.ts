import { auth } from "@/util/auth";

export const GET = auth((request) => {
  if (request.auth?.user) {
    return Response.json("認証済み");
  }
  return Response.json("認証が必要");
});
