import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import * as bcrypt from "bcrypt";
import {
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
} from "@/shared/lib/token";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { JWT, Session, User, userType } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface currentType {
  userId?: string;
  password?: string;
}

interface userDocType {
  id: string;
  email: string;
  password: string;
  username: string;
  image: string;
  role: string;
  refreshToken: string;
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
          const querySnapShot = await getDocs(q);

          // 이메일과 일치하는 사용자 정보가 존재하지 않을 시, 401 null 반환
          if (querySnapShot.empty) {
            return null;
          }

          const user: userDocType = {
            id: '',
            email: '',
            password: '',
            username: '',
            image: '',
            role: '',
            refreshToken: '',
          };

          querySnapShot.forEach((doc) => {
            user.id = doc.id;
            user.email = doc.data()["email"];
            user.password = doc.data()["password"];
            user.username = doc.data()["username"];
            user.image = doc.data()["image"];
            user.role = doc.data()["role"];
            user.refreshToken = doc.data()["refreshToken"];
          })
          
          const isValid = await bcrypt.compare(
            currentPassword,
            user.password
          );

          const username = user.username;
          const userEmail = user.email;
          const userRole = user.role ? user.role : "user";

          if (user && isValid) {
            // 기존 사용자 문서에 저장된 토큰 갱신 처리
            const accessToken = getAccessToken(user);
            const refreshToken = getRefreshToken(user);

            await updateDoc(doc(db, "user", user.id), {
              refreshToken: refreshToken,
            });

            return {
              id: user.id, // 사용자 컬렉션 DB > 로그인 사용자 문서 아이디
              userId: currentUserId,
              name: username,
              email: userEmail,
              role: userRole,
              image: user.image ? user.image : null,
              accessToken: accessToken,
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
        // 엑세스 토큰 payload 추출
        const payload = (user as userType).accessToken?.split(".")[1] || null;

        if (payload !== null) {
          // 엑세스 토큰 payload 디코딩 후 파싱
          const parsePayload: any = JSON.parse(
            Buffer.from(payload, "base64").toString("utf-8")
          );

          // 엑세스 토큰 만료 날짜
          const expiredDate = parsePayload.exp;
          token.accessTokenExpires = new Date(expiredDate * 1000);
        }

        token.id = user.id;
        token.role = (user as userType).role;
      }

      if (new Date() < new Date(token.accessTokenExpires)) return token;

      const newToken = await refreshAccessToken(token);

      return newToken;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
        role: token.role as string,
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
