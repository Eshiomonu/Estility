import { useState, useEffect } from "react";
import axios from "axios";

interface MediaItem {
  id: number;
  url: string;
}

interface StoreLink {
  id: number;
  url: string | null;
}

interface HeroSection {
  id: number;
  title: string;
  subtitle?: string | null;
  testifier_text: string;
  Playstore: StoreLink[];
  Appstore: StoreLink[];
  Testifier_image: MediaItem[];
  carousel_image: MediaItem[]; 
}

export const useHeroSection = () => {
  const [data, setData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get<{ data: HeroSection }>(
          `${import.meta.env.VITE_API_URL}/api/hero?populate=*`
        );

        const hero = res.data.data;

        if (!hero) {
          console.warn("No hero section found in API response", res.data);
          setData(null);
          return;
        }

        const base = import.meta.env.VITE_API_URL;

        const formatted: HeroSection = {
          ...hero,
          Testifier_image: hero.Testifier_image.map((img) => ({
            ...img,
            url: `${base}${img.url}`,
          })),
          carousel_image: hero.carousel_image.map((img) => ({
            ...img,
            url: `${base}${img.url}`,
          })),
        };

        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch hero section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { data, loading };
};
