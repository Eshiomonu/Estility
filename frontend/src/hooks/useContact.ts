import { useEffect, useState } from "react";
import apiClient from "../services/api";

export interface ContactImage {
  id: number;
  url: string;
}

export interface ContactCta {
  id: number;
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

export interface ContactSocial {
  id: number;
  platform: string;
  url: string;
}

export interface ContactData {
  id: number;
  title: string;
  description: string;
  whatsapp_url?: string | null;
  images: ContactImage[];
  cta_button: ContactCta[];
  social_links: ContactSocial[];
}

interface StrapiImage {
  id: number;
  url: string;
}

export function useContact() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiClient.get("/api/contacts?populate=*");
        const contact = res.data?.data?.[0];

        if (contact) {
          const images =
            (contact.images as StrapiImage[] | undefined)?.map((img) => ({
              id: img.id,
              url: `${import.meta.env.VITE_API_URL}${img.url}`,
            })) ?? [];

          setData({
            id: contact.id,
            title: contact.title,
            description: contact.description,
            whatsapp_url: contact.whatsapp_url,
            images,
            cta_button: contact.cta_button ?? [],
            social_links: contact.social_links ?? [],
          });
        } else {
          setData(null);
        }
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

    fetchData();
  }, []);

  return { data, loading, error };
}
