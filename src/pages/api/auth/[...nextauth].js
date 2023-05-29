import axiosClient from "@lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const res = await axiosClient.post("/auth/login", {
            email,
            password,
          });

          const user = res.data;
          return user || null;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      const now = Date.now();
      const maxAge = 6 * 60 * 60; // 6 hours in seconds
      if (session && session.expires) {
        // check if the session has expired
        if (now > session.expires) {
          throw new Error("Session expired");
        }
      }
      // set the session expiration time to 6 hours from now
      session.expires = now + maxAge * 1000;
      session.user = token;
      return session;
    },
  },
});
