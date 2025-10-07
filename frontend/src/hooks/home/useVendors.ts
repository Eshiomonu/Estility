import { useEffect, useState } from "react";
import axios from "axios";

export interface Vendor {
  id: number;
  name: string;
  logo: { url: string } | null;
  website?: string;
}

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/top-vendors?populate=logo`)
      .then((res) => {
        type ApiVendor = {
          id: number;
          name: string;
          logo: { url: string } | null;
          website?: string;
        };

        const items = res.data.data.map((v: ApiVendor) => ({
          id: v.id,
          name: v.name,
          logo: v.logo
            ? { url: `${import.meta.env.VITE_API_URL}${v.logo.url}` }
            : null,
          website: v.website,
        }));
        setVendors(items);
      })
      .catch(() => {
        setError("Failed to load vendors");
      })
      .finally(() => setLoading(false));
  }, []);

  return { vendors, loading, error };
}
