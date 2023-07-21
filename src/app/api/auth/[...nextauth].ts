import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Useremail",
          type: "text",
          placeholder: "jsmith@naver.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.username === "minHyeok" &&
          credentials.password === "test"
        ) {
          const user = {
            id: 1,
            name: "Lim Min Hyeok",
            email: "lim5570@naver.com",
          };

          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
});
