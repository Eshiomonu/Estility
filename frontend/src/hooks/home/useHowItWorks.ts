import { useEffect, useState } from "react";
import axios from "axios";

// Step type
export interface StepImage {
  id: number;
  url: string;
}

export interface Step {
  id: number;
  step_title: string;
  step_description: string;
  step_image?: StepImage | null;
}

// Button type
export interface HowItWorksButton {
  id: number;
  button_name: string;
  steps: Step[];
}

// CTA type
export interface CTA {
  id: number;
  label: string;
  url: string;
  variant: string;
}

// Main HowItWorks type
export interface HowItWorks {
  id: number;
  title: string;
  description: string;
  cta: CTA[];
  buttons: HowItWorksButton[];
}

// Hook
export function useHowItWorks() {
  const [data, setData] = useState<HowItWorks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: HowItWorks | null }>(
          `${import.meta.env.VITE_API_URL}/api/how-it-work?populate=*`
        );

        const apiData = response.data.data;

        if (!apiData) {
          setError("No How It Works data found");
          return;
        }

        // Map buttons and steps safely
      const formattedButtons: HowItWorksButton[] = (apiData.buttons ?? []).map((button) => ({
  id: button.id,
  button_name: button.button_name,
  steps: (button.steps ?? []).map((step) => ({
    id: step.id,
    step_title: step.step_title,
    step_description: step.step_description,
    step_image: step.step_image
      ? { id: step.step_image.id, url: `${import.meta.env.VITE_API_URL}${step.step_image.url}` }
      : null,
  })),
}));


        const formatted: HowItWorks = {
          id: apiData.id,
          title: apiData.title,
          description: apiData.description,
          cta: apiData.cta || [],
          buttons: formattedButtons || [],
        };

        setData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load How It Works");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
