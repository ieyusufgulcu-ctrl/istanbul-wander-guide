import { useEffect, useState } from "react";

/**
 * Simulates a short async load so screens can show skeleton states on
 * first mount. Realistic UX polish for an MVP without real network.
 * Default 650ms — enough to register, short enough to feel snappy.
 */
export function useFakeLoading(durationMs = 650) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs]);
  return loading;
}

export default useFakeLoading;