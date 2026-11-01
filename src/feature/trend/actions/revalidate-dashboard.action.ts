'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getToken } from 'next-auth/jwt';

/**
 * 2026.11.01 관리자 데이터 수집 완료 후 메인 대시보드 ISR 캐시 무효화 Server Action
 * - 수집 파이프라인이 마이홈(클라이언트)에서 실행되므로, 완료 시점에 이 액션을 호출해 갱신
 * - Server Action은 외부에서도 POST로 호출 가능하므로 NextAuth JWT의 관리자 role을 서버에서 재검증
 */
export const revalidateDashboard = async () => {
  const token = await getToken({
    req: { cookies: await cookies(), headers: await headers() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.role !== 'admin') {
    return { success: false, message: '관리자 권한이 없습니다.' };
  }

  revalidatePath('/');

  return { success: true, message: '메인 대시보드 데이터를 갱신했습니다.' };
};
