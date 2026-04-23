import { useCallback, useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "@/lib/storage";

/**
 * Tiny client-side store for saved experience IDs. Persists to localStorage
 * so the heart state survives navigation across Detail / Profile / Search.
 * In a Lovable Cloud / Supabase build this would call a `saved_experiences`
 * table — same hook surface.
 */
export function useSavedExperiences() {
  const [ids, setIds] = useState<string[]>(
    () => storage.get<string[]>(STORAGE_KEYS.saved) ?? [],
  );

  useEffect(() => {
    storage.set(STORAGE_KEYS.saved, ids);
  }, [ids]);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  return { ids, isSaved, toggle, count: ids.length };
}

export default useSavedExperiences;