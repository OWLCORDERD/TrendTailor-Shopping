import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import * as bcrypt from "bcrypt";

interface example {
  clientId: string;
  clientSecret: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Crendentials",

      credentials: {
        userEmail: {
          label: "이메일",
          type: "email",
          placeholder: "example@naver.com",
        },
        password: { label: "비밀번호", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          const CurrentUserEmail = String(credentials?.userEmail);
          const CurrentPassword = String(credentials?.password);

          const res = await axios.post("http://localhost:3000/api/login", {
            userEmail: CurrentUserEmail,
          });

          const user = res.data;

          const isValid = await bcrypt.compare(
            CurrentPassword,
            user.data[0].password
          );

          const username = user.data[0].username;

          if (user && isValid) {
            return {
              email: CurrentUserEmail,
              name: username,
            };
          }
        } catch (err) {
          console.log(err);
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
