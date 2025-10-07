import { useState } from "react";
import { motion } from "framer-motion";
import { useWhyEstility } from "../../hooks/home/useWhyEstility";

export default function WhyEstilitySection() {
  const { data, loading, error } = useWhyEstility();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return null;

  // Define background colors for each card (cycled if more cards exist)
  const cardColors = ["#F8E8F2", "#E8F7F0", "#E8EDFF", "#FFF7E8"];

  return (
    <section className="relative py-16 px-6 md:px-12 bg-white text-center overflow-hidden">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#1D0B32] mb-8 font-sora">
        {data.title}
      </h2>

      {/* Description */}
      <p className="text-[#4B3E5A] text-base md:text-lg max-w-3xl mx-auto mb-16 leading-relaxed font-sora">
        {data.description}
      </p>

       {/* Animated Hover Line Indicator */}
      <div className="relative w-full h-[2px] mt-8 bg-[#6C6963]">
        {hoveredIndex !== null && (
          <motion.div
            layout
            className="absolute h-[2px] bg-[#1D0B32]"
            initial={false}
            animate={{
              width: "300px",
              x: hoveredIndex * 330, 
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
          />
        )}
      </div>

      {/* Cards Container */}
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {data.cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative w-[300px] h-[246px] rounded-2xl shadow-md cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center px-5"
            style={{
              backgroundColor: cardColors[index % cardColors.length],
            }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {/* Icon */}
            {card.icon && (
              <img
                src={card.icon.url}
                alt={card.title}
                className="w-14 h-14 mb-4"
              />
            )}

            {/* Title */}
            <h3
              className="font-sora font-semibold text-[18px] leading-[25px] text-[#121212];
]"
              style={{ letterSpacing: "0%" }}
            >
              {card.title}
            </h3>

            {/* Description */}
            <p
              className="font-sora font-normal text-[18px] leading-[25px] text-[#121212] mt-2"
              style={{ letterSpacing: "0%" }}
            >
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

     
    </section>
  );
}
