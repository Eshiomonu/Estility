import { useState, useEffect } from "react";
import axios from "axios";

export interface TermContentBlock {
  type: "heading" | "paragraph";
  level?: number;
  children: {
    text: string;
  }[];
}

export interface TermData {
  id: number;
  page: string;
  content: TermContentBlock[];
}

export function useTerms() {
  const [data, setData] = useState<TermData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get<{ data: TermData[] }>(
          `${import.meta.env.VITE_API_URL}/api/terms-and-conditions?filters[page][$eq]=terms-and-conditions`
        );

        if (res.data.data.length > 0) {
          setData(res.data.data[0]);
        } else {
          setError("No terms content found.");
        }
      } catch {
        setError("Failed to fetch terms content.");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return { data, loading, error };
}
