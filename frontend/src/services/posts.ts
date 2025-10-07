import apiClient from "./api";

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  author: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const getPosts = async (
  page = 1,
  pageSize = 6
): Promise<PaginatedResponse<Post>> => {
  const res = await apiClient.get("/posts", {
    params: {
      populate: "coverImage",
      pagination: { page, pageSize },
      sort: "publishedAt:desc",
    },
  });

  return {
    data: res.data.data.map((item: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        coverImage?: {
          data?: {
            attributes: {
              url: string;
            };
          };
        };
        author: string;
      };
    }) => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      publishedAt: item.attributes.publishedAt,
      coverImage: item.attributes.coverImage?.data?.attributes || null,
      author: item.attributes.author,
    })),
    meta: res.data.meta,
  };
};
