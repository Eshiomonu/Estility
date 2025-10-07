// src/services/contactService.ts
import apiClient from "./api";

export interface ContactImage {
  id: number;
  url: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface CTAButton {
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

export interface ContactData {
  title: string;
  description: string;
  images: ContactImage[];
  whatsapp_url: string;
  cta_button: CTAButton;
  social_links: SocialLink[];
}

export const fetchContactData = async (): Promise<ContactData | null> => {
  const res = await apiClient.get("/api/contacts?populate=*");
  return res.data?.data?.[0]?.attributes ?? null;
};
