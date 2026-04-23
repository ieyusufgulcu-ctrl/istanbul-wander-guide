/**
 * Tiny safe localStorage helpers. Keep keys namespaced under `ji.`
 * so future React Native AsyncStorage adapter is a drop-in swap.
 */

const PREFIX = "ji.";

export const storage = {
  get<T = string>(key: string): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as unknown as T;
      }
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(
        PREFIX + key,
        typeof value === "string" ? value : JSON.stringify(value),
      );
    } catch {
      /* noop */
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      /* noop */
    }
  },
};

export const STORAGE_KEYS = {
  onboarded: "onboarded",
  saved: "saved.experiences",
  homeCategory: "home.category",
  searchCategory: "search.category",
} as const;