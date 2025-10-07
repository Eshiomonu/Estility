// src/services/footerService.ts
import apiClient from "./api";

export interface FooterLink {
  id: number;
  label: string;
  url: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

// Each promo CTA button
export interface CtaButton {
  id: number;
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

// Promo section
export interface FooterPromo {
  title: string;
  description: string;
  cta?: CtaButton[];
}

export interface FooterData {
  promo?: FooterPromo | null;
  logo?: { url: string } | null;
  copyright_text?: string;
  address?: string;
  company_links?: FooterLink[];
  support_links?: FooterLink[];
  legal_links?: FooterLink[];
  social_links?: SocialLink[];
  newsletter_text?: string;
}

export const fetchFooterData = async (): Promise<FooterData | null> => {
  const res = await apiClient.get("/api/footer?populate=*");
  return res.data?.data ?? null;
};
