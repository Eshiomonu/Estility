const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export async function fetchFromStrapi<T>(endpoint: string, populate = "*"): Promise<T> {
  const url = `${STRAPI_URL}/api/${endpoint}${populate ? `?populate=${populate}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json as T;
}

// Helper for image URLs
export function getStrapiMedia(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}
