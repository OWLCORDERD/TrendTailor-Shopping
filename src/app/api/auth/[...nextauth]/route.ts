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

      credentials: {
        userEmail: {
          label: "UserEmail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },

      authorize: async (credentials: currentType | undefined) => {
        try {
          const currentUserEmail = String(credentials?.userEmail);
          const currentPassword = String(credentials?.password);

          const matchEmail: any = JSON.stringify({
            email: currentUserEmail,
          });

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: matchEmail,
            }
          );

          const user = await res.json();

          const isValid = await bcrypt.compare(
            currentPassword,
            user[0].password
          );

          const username = user[0].username;

          if (user && isValid) {
            return {
              email: currentUserEmail,
              name: username,
            } as any;
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
    } as any),
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
