import apiClient from "./api";

export interface NavLink {
  id: number;
  label: string;
  url: string;
  order: number;
}

export interface NavigationData {
  logo: { url: string };
  links: NavLink[];
  cta_button?: { label: string; url: string; variant: string };
}

export const getNavigation = async (): Promise<NavigationData> => {
  const res = await apiClient.get("/api/navigations?populate=*");
  return res.data.data[0] as NavigationData; 
};
