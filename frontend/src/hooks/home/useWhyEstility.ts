import { useEffect, useState } from "react";
import axios from "axios";

// ---------- Types ----------
interface RichTextChild {
  type: "text";
  text: string;
}

interface RichTextNode {
  type: "paragraph";
  children: RichTextChild[];
}

interface Icon {
  id: number;
  url: string;
}

export interface WhyEstilityCard {
  id: number;
  title: string;
  description: string;
  icon?: Icon | null;
}

export interface WhyEstilityAPIResponse {
  id: number;
  title: string;
  description: RichTextNode[];
  cards: {
    id: number;
    title: string;
    description: string;
    icon?: Icon | null;
  }[];
}

export interface WhyEstility {
  id: number;
  title: string;
  description: string;
  cards: WhyEstilityCard[];
}

// ---------- Hook ----------
export function useWhyEstility() {
  const [data, setData] = useState<WhyEstility | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get<{ data: WhyEstilityAPIResponse }>(
          `${import.meta.env.VITE_API_URL}/api/why-estility?populate=*`
        );

        const apiData = response.data.data;
        if (!apiData) {
          setError("No data found for 'Why Estility'");
          return;
        }

        // Safely extract plain text from rich-text description
        const descriptionText = Array.isArray(apiData.description)
          ? apiData.description
              .flatMap((node) =>
                node.children.map((child) => child.text.trim())
              )
              .join(" ")
          : "";

        const formatted: WhyEstility = {
          id: apiData.id,
          title: apiData.title,
          description: descriptionText,
          cards: apiData.cards.map((card) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            icon: card.icon
              ? {
                  id: card.icon.id,
                  url: `${import.meta.env.VITE_API_URL}${card.icon.url}`,
                }
              : null,
          })),
        };

        setData(formatted);
      } catch (err) {
        console.error("Failed to load 'Why Estility' section:", err);
        setError("Unable to load data for 'Why Estility'");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
