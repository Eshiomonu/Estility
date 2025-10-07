import { useBecomePartner } from "../../hooks/home/useBecomePartner";

export default function PartnerSection() {
  const { data, loading, error } = useBecomePartner();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>

        {/* Rows */}
        {data.rows.map((row, index) => {
          const isReverse = index % 2 !== 0; // reverse every second row
          return (
            <div
              key={row.id}
              className={`flex flex-col md:flex-row items-center mb-12 ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Left column: icon + title + description */}
              <div className="md:w-1/2 p-4 text-center md:text-left">
                {row.icon && (
                  <img
                    src={row.icon.url}
                    alt={row.title}
                    className="w-16 h-16 mb-4 mx-auto md:mx-0"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600">
                  {row.title}
                </h3>
                <p className="text-gray-700">{row.description}</p>
              </div>

              {/* Right column: image */}
              {row.image && (
                <div className="md:w-1/2 p-4 flex justify-center">
                  <img
                    src={row.image.url}
                    alt={row.title}
                    className="rounded-xl object-cover w-full max-w-md"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
