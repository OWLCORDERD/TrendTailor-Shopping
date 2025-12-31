import jwt from "jsonwebtoken";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

// 최초 로그인 시, 액세스 토큰 발급
export function getAccessToken(user: any) {
  return jwt.sign(user, accessTokenSecret, { expiresIn: "1h" });
}

// 최초 로그인 시, 리프레시 토큰 발급
export function getRefreshToken(user: any) {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: "2h" });
}

// 엑세스 토큰 검증 요청 시, 인자로 전달받은 토큰으로 유효성 체크
export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (e) {
    return null;
  }
}

// 리프레시 토큰 검증 요청 시, 인자로 전달받은 토큰으로 유효성 체크
export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, refreshTokenSecret);
  } catch (e) {
    return null;
  }
}

export async function refreshAccessToken(token: any) {
  try {
    const decoded: any = verifyRefreshToken(token.refreshToken);
    if (!decoded) throw new Error("Invalid refresh token");

    const userRef = doc(db, "user", decoded.userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User not found");
    const user = userSnap.data();

    // 새로운 accessToken 발급
    const newAccessToken = getAccessToken(user);

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 30 * 60 * 1000,
    };
  } catch (err) {
    console.error("Token refresh failed:", err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
