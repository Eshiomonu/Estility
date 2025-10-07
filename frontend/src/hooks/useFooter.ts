// src/hooks/useFooter.ts
import { useEffect, useState } from "react";
import { fetchFooterData, FooterData } from "../services/footerService";

export const useFooter = () => {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterData()
      .then(setFooter)
      .catch((err) => console.error("Footer fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { footer, loading };
};
