import { useEffect, useState } from "react";
import { fetchFromStrapi } from "../lib/strapi";

// Generic Strapi response types
interface StrapiSingleResponse<T> {
  data: T;
  meta?: unknown;
}

interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: unknown;
}

type StrapiResponse<T> = StrapiSingleResponse<T> | StrapiCollectionResponse<T>;

export function useStrapi<T>(
  endpoint: string,
  populate: string | boolean = "*"
) {
  const [data, setData] = useState<T | T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    fetchFromStrapi<StrapiResponse<T>>(endpoint, populate ? "*" : "")
      .then((res) => {
        if (!mounted) return;

        // If API returned an array → collection
        if (Array.isArray(res.data)) {
          setData(res.data as T[]);
        } else {
          // Single type
          setData(res.data as T);
        }
      })
      .catch((err) => {
        if (mounted) setError(err as Error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint, populate]);

  return { data, loading, error };
}
