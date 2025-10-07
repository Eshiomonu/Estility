import { useEffect, useState } from "react";
import axios from "axios";

// --- Interfaces (as above) ---
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

// --- Hook implementation ---
export function useFaq() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get<FaqApiResponse>(
          `${import.meta.env.VITE_API_URL}/api/faq-categories?populate=*`
        );

        const data = response.data.data;

        setCategories(data);


        const firstWithFaqs = data.find((cat) => cat.faqs.length > 0) || data[0] || null;
        setSelectedCategory(firstWithFaqs);
      } catch (err) {
        console.error("Failed to load FAQs:", err);
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleCategorySelect = (slug: string) => {
    const found = categories.find((cat) => cat.Slug === slug);
    setSelectedCategory(found || null);
  };

  const filteredFaqs = selectedCategory
    ? selectedCategory.faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
