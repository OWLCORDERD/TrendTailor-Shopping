import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Crendentials",

      credentials: {
        username: {
          label: "아이디",
          type: "text",
          placeholder: "example@naver.com",
        },
        password: { label: "비밀번호", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          const CurrentUsername = String(credentials?.username);
          const CurrentPassword = String(credentials?.password);

          const res = await axios.post("http://localhost:3000/api/login", {
            username: CurrentUsername,
          });

          const user = res.data;

          const isValid = await bcrypt.compare(
            CurrentPassword,
            user.data[0].password
          );

          const username = user.data[0].username;
          const email = user.data[0].email;

          if (user && isValid) {
            return {
              email: email,
              name: username,
            };
          }
        } catch (err) {
          console.error(err);
        }
        return null;
      },
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
  },
});

export { handler as GET, handler as POST };
