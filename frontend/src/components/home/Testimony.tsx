import { useTestimony } from "../../hooks/home/useTestimony";
import { CTAButton } from "../common/CTAButton";

export default function Testimony() {
  const { data, loading, error } = useTestimony();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  // Limit cards to max 6
  const displayedCards = data.cards.slice(0, 6);

  return (
    <section className="py-16 bg-purple-600 text-white">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
        {data.description && (
          <p className="text-white mb-8">{data.description}</p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {displayedCards.map((card) => (
            <div
              key={card.id}
              className="bg-purple-700 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <p className="text-lg italic mb-4">"{card.text}"</p>
              <h4 className="font-semibold text-white">{card.name}</h4>
            </div>
          ))}
        </div>

        {/* Section CTA Button */}
        {data.cards.length > 0 && (
          <CTAButton
            label="Read More Testimonials"
            url="/testimonials"
            type="primary"
            size="large"
          />
        )}
      </div>
    </section>
  );
}
