// SSR 안전한 미디어 쿼리 훅 (usehooks-ts 래퍼)
// initializeWithValue: false → 서버/클라이언트 첫 렌더 시 false 반환 (hydration mismatch 방지)
import { useMediaQuery as useMediaQueryBase } from "usehooks-ts";

/**
 * CSS 미디어 쿼리 감지 훅
 * @param query - CSS 미디어 쿼리 문자열 (예: "(max-width: 768px)")
 * @returns 미디어 쿼리 일치 여부
 */
export function useMediaQuery(query: string): boolean {
  return useMediaQueryBase(query, { initializeWithValue: false });
}

// 자주 쓰는 브레이크포인트 편의 훅
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
