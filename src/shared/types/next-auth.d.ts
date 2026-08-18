import { User } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 2025.10.18: nextAuth 세션, 토큰 타입 모듈 생성
declare module "next-auth" {
  // 기본 세션 타입과 업데이트되는 세션 확장 타입
  interface Session extends DefaultSession {
    user: {
      email: string; // 사용자 이메일
      name: string; // 사용자 이름
      image: string; // 사용자 프로필 이미지
      role?: string; // 사용자 권한 (admin, user)
    };
    error?: string; // 토큰 재발급 에러 시, 에러 상태 업데이트 값
  }

  // nextAuth 로그인 사용자 토큰 타입
  interface JWT extends DefaultJWT {
    id?: string; // 로그인 사용자 컬렉션 문서 아이디
    accessToken?: string; // 엑세스 토큰 (64진수 hex)
    refreshToken?: string; // 리프레시 토큰 (64진수 hex)
    role?: string; // 사용자 권한 (admin, user)
    accessTokenExpires?: any; // 로그인 시점 토큰 만료 시간 (밀리초)
    error?: string; // 토큰 재발급 에러 시, 에러 상태 업데이트 값
  }

  interface userType extends User {
    id?: string; // 사용자 컬렉션 DB > 로그인 사용자 문서 아이디
    email?: string | null;
    name?: string;
    image?: string | null;
    role?: string; // 사용자 권한 (admin, user)
    accessToken?: string; // 엑세스 토큰 (64진수 hex)
    refreshToken?: string; // 리프레시 토큰 (64진수 hex)
  }
}
