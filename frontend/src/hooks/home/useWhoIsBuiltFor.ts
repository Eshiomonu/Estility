import { useEffect, useState } from "react";
import axios from "axios";

// Card type
export interface BuiltForCard {
  id: number;
  title: string;
  description: string;
  image?: {
    id: number;
    url: string;
  } | null;
}

// Section type
export interface WhoIsBuiltFor {
  id: number;
  title: string;
  subtitle?: string;
  cards: BuiltForCard[];
}

// Hook
export function useWhoIsBuiltFor() {
  const [data, setData] = useState<WhoIsBuiltFor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: WhoIsBuiltFor | null }>(
          `${import.meta.env.VITE_API_URL}/api/who-built-for?populate=*`
        );

        const apiData = response.data.data;

        if (!apiData) {
          setError("No data found for Who is Estility Built For");
          return;
        }

        const formatted: WhoIsBuiltFor = {
          id: apiData.id,
          title: apiData.title,
          subtitle: apiData.subtitle,
          cards: (apiData.cards ?? []).map((card) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            image: card.image
              ? { id: card.image.id, url: `${import.meta.env.VITE_API_URL}${card.image.url}` }
              : null,
          })),
        };

        setData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load section");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
