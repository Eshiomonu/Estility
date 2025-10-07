import { useState, useEffect } from "react";
import axios from "axios";

export interface PageTitleData {
  title: string;
  description?: string | null;
  page: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const usePageTitle = (page: string) => {
  const [data, setData] = useState<PageTitleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageTitle = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<{ data: PageTitleData[] }>(
          `${API_URL}/api/page-titles`,
          { params: { "filters[page][$eq]": page } }
        );

        if (res.data.data && res.data.data.length > 0) {
          setData(res.data.data[0]);
        } else {
          setError("No page title found");
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPageTitle();
  }, [page]);

  return { data, loading, error };
};
