import { useState, useEffect } from "react";
import { useHeroSection } from "../../hooks/home/useHeroSection";

type TestifierImage = {
  id: string | number;
  url: string;
};

interface TestimonyPreviewProps {
  images?: TestifierImage[];
  text?: string;
}

export default function HeroSection() {
  const { data, loading } = useHeroSection();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel auto-slide
  useEffect(() => {
    if (!data?.carousel_image?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) % data.carousel_image.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading || !data) return <p>Loading...</p>;

  const currentImage = data.carousel_image[currentIndex];
 

  return (
    <section className="bg-[#1D0B32] text-white py-16 px-6 md:px-12">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">

        {/* Left Column */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-6">
            {data.title}
          </h1>

        

          {/* Store Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mt-6 flex-wrap">
            {data.Playstore?.[0]?.url && (
              <a
                href={data.Playstore[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/playstore.png"
                  alt="Get on Google Play"
                  className="h-12"
                />
              </a>
            )}
            {data.Appstore?.[0]?.url && (
              <a
                href={data.Appstore[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/appstore-badge.png"
                  alt="Download on App Store"
                  className="h-12"
                />
              </a>
            )}
          </div>
            {/* Testimony Preview */}
          <TestimonyPreview
            images={data.Testifier_image}
            text={data.testifier_text}
          />
        </div>

        {/* Right Column (Carousel) */}
        <div className="relative w-full">
          {currentImage && (
            <img
              key={currentImage.id}
              src={currentImage.url}
              alt="Carousel"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg transition-all duration-700 ease-in-out"
            />
          )}

          {/* Carousel Indicators */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {data.carousel_image?.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  index === currentIndex
                    ? "bg-purple-500 scale-110"
                    : "bg-white opacity-50"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonyPreview({ images, text }: TestimonyPreviewProps) {
  return (
    <div className="flex justify-center md:justify-start items-center gap-3 mt-6">
      <div className="flex -space-x-3">
        {images?.slice(0, 3).map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt="Testifier"
            className="w-10 h-10 rounded-full border-2 border-purple-900"
          />
        ))}
      </div>
      <span className="text-sm max-w-sm">{text}</span>
    </div>
  );
}
