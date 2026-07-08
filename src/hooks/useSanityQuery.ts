import { useEffect, useState } from "react";

type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
};

/**
 * Fetch CMS data with a static fallback so the UI never goes empty
 * when Sanity is offline, misconfigured, or still empty.
 *
 * Runs once on mount — pass a stable fetcher (module-level function).
 */
export function useSanityQuery<T>(
  fetcher: () => Promise<T | null>,
  fallback: T,
): AsyncState<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      try {
        const result = await fetcher();
        if (cancelled) return;
        if (result !== null) setData(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
    // intentionally mount-only: fallback/fetcher are expected to be stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
