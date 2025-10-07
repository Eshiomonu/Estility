import { useEffect, useState } from "react";
import axios from "axios";

export interface PartnerRow {
  id: number;
  icon?: { id: number; url: string } | null;
  title: string;
  description: string;
  image?: { id: number; url: string } | null;
}

export interface BecomePartnerSection {
  id: number;
  title: string;
  rows: PartnerRow[];
}

export function useBecomePartner() {
  const [data, setData] = useState<BecomePartnerSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: BecomePartnerSection | null }>(
          `${import.meta.env.VITE_API_URL}/api/become-partner?populate[rows][populate]=*`
        );

        const apiData = response.data.data;
        if (!apiData) {
          setError("No Become a Partner data found");
          return;
        }

        const formatted: BecomePartnerSection = {
          id: apiData.id,
          title: apiData.title,
          rows: (apiData.rows ?? []).map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            icon: row.icon
              ? { id: row.icon.id, url: `${import.meta.env.VITE_API_URL}${row.icon.url}` }
              : null,
            image: row.image
              ? { id: row.image.id, url: `${import.meta.env.VITE_API_URL}${row.image.url}` }
              : null,
          })),
        };

        setData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load Become a Partner section");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
