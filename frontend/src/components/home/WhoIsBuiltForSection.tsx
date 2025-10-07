import { useWhoIsBuiltFor } from "../../hooks/home/useWhoIsBuiltFor";

export default function WhoIsBuiltForSection() {
  const { data, loading, error } = useWhoIsBuiltFor();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error || !data) return <p className="text-center text-red-500">{error || "Failed to load content"}</p>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="mb-10">
          <h2
            className="text-[46px] leading-[56px] tracking-[-0.96px] text-[#0A2540] font-bold font-[Inter] text-left"
          >
            {data.title}
          </h2>
          <div className="h-[3px] w-full max-w-[927px] mt-3 rounded-[1.47px] bg-gradient-to-r from-[#9792E3] via-[#0073E6] via-55% to-[#C5C2FF]" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {card.image && (
                <img
  src={
    card.image?.url?.startsWith("http")
      ? card.image.url
      : `${import.meta.env.VITE_API_URL || "http://localhost:1337"}${card.image.url}`
  }
  alt={card.title}
  className="w-[346px] h-[373px] object-contain rounded-[6px] mb-4 px-[3px]"
/>
              )}
              <h4
                className="font-[Sora] font-medium text-[19.72px] leading-[26.38px] text-[#0A2540] mb-2"
              >
                {card.title}
              </h4>
              <p
                className="font-[Sora] font-light text-[14px] leading-[20.52px] tracking-[0.15px] text-gray-600"
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
