import { useEffect, useState } from "react";
import axios from "axios";

// Testimony card type
export interface TestimonyCard {
  id: number;
  name: string;
  text: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

// Section type
export interface TestimonySection {
  id: number;
  title: string;
  description?: string;
  cards: TestimonyCard[];
}

// Hook
export function useTestimony() {
  const [data, setData] = useState<TestimonySection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: TestimonySection | null }>(
          `${import.meta.env.VITE_API_URL}/api/testimonials?populate=*`
        );

        const apiData = response.data.data;

        if (!apiData) {
          setError("No testimony data found");
          return;
        }

        const formatted: TestimonySection = {
          id: apiData.id,
          title: apiData.title,
          description: apiData.description,
          cards: (apiData.cards ?? []).map((card) => ({
            id: card.id,
            name: card.name,
            text: card.text,
            ctaLabel: card.ctaLabel,
            ctaUrl: card.ctaUrl,
          })),
        };

        setData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load testimony section");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
