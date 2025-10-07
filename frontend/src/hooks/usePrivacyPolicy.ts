import { useState, useEffect } from "react";
import axios from "axios";

export interface PrivacyContentBlock {
  type: "heading" | "paragraph";
  level?: number;
  children: {
    text: string;
  }[];
}

export interface PrivacyData {
  id: number;
  page: string;
  content: PrivacyContentBlock[];
}

export function usePrivacyPolicy() {
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const res = await axios.get<{ data: PrivacyData[] }>(
          `${import.meta.env.VITE_API_URL}/api/privacy-policies?filters[page][$eq]=privacy-policy`
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

    fetchPrivacy();
  }, []);

  return { data, loading, error };
}
