import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  debug: true,
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
});
