// src/hooks/useAbout.ts
import { useEffect, useState } from "react";
import axios from "axios";

export interface AboutData {
  mission_title: string;
  mission_description: string;
  vision_title: string;
  vision_description: string;
  story_title: string;
  story_description: string;
 story_image: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  cta_button?: {
    label: string;
    url: string;
    variant: "primary" | "secondary";
  }[];
}

export function useAbout() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/about?populate=*"
        );
        setData(res.data.data);
     } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch contact data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { data, loading, error };
}
