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
import { JWT, Session, User, userType } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface currentType {
  userId?: string;
  password?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Crendentials",

      credentials: {
        userId: {
          label: "userId",
          type: "text",
        },
        password: {
          label: "password",
          type: "text",
        },
      },

      authorize: async (credentials: currentType | undefined) => {
        try {
          const currentUserId = String(credentials?.userId);
          const currentPassword = String(credentials?.password);

          // firebase 사용자 컬렉션 내부에 이메일 사용자 문서 조회
          const docRef = collection(db, "user");
          const q = query(docRef, where("id", "==", currentUserId));
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
                id: currentUserId,
              }),
            }
          );

          const user = await res.json();

          const isValid = await bcrypt.compare(
            currentPassword,
            user[0].password
          );

          const username = user[0].username;
          const userEmail = user[0].email;

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
              id: userId, // 사용자 컬렉션 DB > 로그인 사용자 문서 아이디
              userId: currentUserId,
              name: username,
              email: userEmail,
              image: user[0].image ? user[0].image : null,
              accessToken: accesssToken,
              refreshToken: refreshToken,
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
    } as any),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as userType).accessToken;
        token.refreshToken = (user as userType).refreshToken;
        token.accessTokenExpires = Date.now() + 30 * 60 * 1000; // 토큰 유효 30분
      }

      if (Date.now() < token.accessTokenExpires) return token;

      const newToken = await refreshAccessToken(token);

      return newToken;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
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
