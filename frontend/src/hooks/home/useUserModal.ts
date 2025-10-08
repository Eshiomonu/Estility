import { useEffect, useState } from "react";
import axios from "axios";

export interface MediaItem {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    };
  } | null;
}

export interface UserModalData {
  id: number;
  title: string;
  description?: string;
  cta_text: string;
  playstore_link?: string;
  appstore_link?: string;
  barcode_cta_text?: string;
  barcode_cta_link?: string;
  image?: MediaItem;
  barcode?: MediaItem;
}

export function useUserModal() {
  const [data, setData] = useState<UserModalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-modal?populate=*`);
        const raw = res.data.data;
        if (!raw) throw new Error("No modal data found");

        const attr = raw.attributes;
        setData({
          id: raw.id,
          title: attr.title,
          description: attr.description,
          cta_text: attr.cta_text,
          playstore_link: attr.playstore_link,
          appstore_link: attr.appstore_link,
          barcode_cta_text: attr.barcode_cta_text,
          barcode_cta_link: attr.barcode_cta_link,
          image: attr.image,
          barcode: attr.barcode
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load modal content");
      } finally {
        setLoading(false);
      }
    };

    fetchModalData();
  }, []);

  return { data, loading, error };
}
