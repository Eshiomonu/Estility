import { useEffect, useState } from "react";


interface NavLink {
  id: number;
  label: string;
  url: string;
  order: number;
}

interface CtaButton {
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

interface Logo {
  url: string;
  alternativeText?: string;
}

interface Navigation {
  id: number;
  logo: Logo | null;
  links: NavLink[];
  cta_button: CtaButton | null;
}

export const useNavigation = () => {
  const [navigation, setNavigation] = useState<Navigation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/navigation?populate=*`
        );
        const json = await res.json();

        // Cast JSON response to Navigation type
        setNavigation(json.data as Navigation);
      } catch (err) {
        console.error("Navigation fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNav();
  }, []);

  return { navigation, loading };
};
