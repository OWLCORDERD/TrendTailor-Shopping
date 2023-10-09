import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import * as bcrypt from "bcrypt";

interface currentType {
  userEmail: string | undefined;
  password: string | undefined;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Crendentials",

      authorize: async (credentials: currentType) => {
        try {
          const currentUserEmail = String(credentials?.userEmail);
          const currentPassword = String(credentials?.password);

          const res = await axios.post("http://localhost:3000/api/login", {
            userEmail: currentUserEmail,
          });

          const user = res.data;

          const isValid = await bcrypt.compare(
            currentPassword,
            user.data[0].password
          );

          const username = user.data[0].username;

          if (user && isValid) {
            return {
              email: currentUserEmail,
              name: username,
            };
          }
        } catch (e) {
          throw new Error("error to access account");
        }
        return null;
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },
});

export { handler as GET, handler as POST };
