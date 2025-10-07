import { useState, useEffect } from "react";
import axios from "axios";

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get<{ data: { id: number; attributes: Notification }[] }>(
          `${import.meta.env.VITE_API_URL}/api/notifications`
        );

        const formatted = res.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.description,
          time: item.attributes.time,
        }));

        setNotifications(formatted);
      } catch (error) {
        console.error("❌ Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading };
};
