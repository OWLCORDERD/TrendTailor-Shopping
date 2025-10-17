import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import * as bcrypt from "bcrypt";
import {
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
} from "@/lib/token";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/component/fetchDB/firebase";

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

          // firebase 사용자 컬렉션 내부에 이메일 사용자 문서 조회
          const docRef = collection(db, "user");
          const q = query(docRef, where("email", "==", currentUserEmail));
          const userDoc = await getDocs(q);

          // 이메일과 일치하는 사용자 정보가 존재하지 않을 시, 401 null 반환
          if (userDoc.empty) {
            return null;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: currentUserEmail,
              }),
            }
          );

          const user = await res.json();

          const isValid = await bcrypt.compare(
            currentPassword,
            user[0].password
          );

          const username = user[0].username;

          if (user && isValid) {
            const accesssToken = getAccessToken(user[0]);
            const refreshToken = getRefreshToken(user[0]);

            let userId = "";
            userDoc.forEach((doc: any) => {
              userId = doc.id;
            });

            await updateDoc(doc(db, "user", userId), {
              refreshToken: refreshToken,
            });

            return {
              userId: userId, // 사용자 컬렉션 DB > 로그인 사용자 문서 아이디
              email: currentUserEmail,
              name: username,
              image: user[0].image ? user[0].image : null,
              accessToken: accesssToken,
              refreshToken: refreshToken,
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

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.userId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 30 * 60 * 1000; // 토큰 유효 30분
      }

      if (Date.now() < token.accessTokenExpires) return token as loginTokenType;

      const newToken = await refreshAccessToken(token);

      return newToken;
    },

    async session({ session, token }: {session: any, token: any}) {
      session.user = {
        email: token.email,
        name: token.name,
        image: token.picture,
      };
      session.error = token.error;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };
