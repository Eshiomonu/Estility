import { useState, useEffect } from "react";
import axios from "axios";

export interface CookieContentBlock {
  type: "heading" | "paragraph";
  level?: number;
  children: {
    text: string;
  }[];
}

export interface CookieData {
  id: number;
  page: string;
  content: CookieContentBlock[];
}

export function useCookiePolicy() {
  const [data, setData] = useState<CookieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCookiePolicy = async () => {
      try {
        const res = await axios.get<{ data: CookieData[] }>(
          `${import.meta.env.VITE_API_URL}/api/cookies-policies?filters[page][$eq]=cookies-policy`
        );

        if (res.data.data.length > 0) {
          setData(res.data.data[0]);
        } else {
          setError("No privacy policy content found.");
        }
      } catch {
        setError("Failed to fetch privacy policy content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCookiePolicy();
  }, []);

  return { data, loading, error };
}
