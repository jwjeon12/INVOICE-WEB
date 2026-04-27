// 타입 안전한 localStorage 훅 (usehooks-ts 래퍼)
// SSR 환경에서 localStorage 접근 오류를 usehooks-ts 내부에서 처리
import { useLocalStorage as useLocalStorageBase } from "usehooks-ts";

/**
 * localStorage 상태 관리 훅 (useState와 동일한 인터페이스)
 * @param key - localStorage 키
 * @param initialValue - 초기값 (key가 없을 때 사용)
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  return useLocalStorageBase<T>(key, initialValue);
}
