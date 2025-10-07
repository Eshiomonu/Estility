import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

export interface FaqItem {
  id: number;
  documentId: string;
  question: string;
  answers: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FaqCategory {
  id: number;
  documentId: string;
  title: string;
  Slug: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  faqs: FaqItem[];
}

export interface FaqApiResponse {
  data: FaqCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function useFaq() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<FaqApiResponse>(
          `${import.meta.env.VITE_API_URL}/api/faq-categories?populate[faqs]=*`
        );

        if (data && Array.isArray(data.data)) {
          setCategories(data.data);

          // Automatically select first category that has FAQs
          const firstWithFaqs = data.data.find((cat) => cat.faqs.length > 0) ?? data.data[0] ?? null;
          setSelectedCategory(firstWithFaqs);
        } else {
          setError("No FAQ categories found.");
        }
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        setError("Unable to load FAQs at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);


  const handleCategorySelect = useCallback(
    (slug: string) => {
      const found = categories.find((cat) => cat.Slug === slug);
      setSelectedCategory(found || null);
    },
    [categories]
  );

  
  const filteredFaqs = useMemo(() => {
    if (!selectedCategory) return [];
    if (!searchQuery.trim()) return selectedCategory.faqs;

    return selectedCategory.faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  return {
    categories,
    selectedCategory,
    filteredFaqs,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCategorySelect,
  };
}
