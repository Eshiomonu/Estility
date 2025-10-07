import { useVendors } from "../../hooks/home/useVendors";

export default function TopVendorsSection() {
  const { vendors, loading, error } = useVendors();

  if (loading) {
    return <p className="text-center text-gray-500">Loading vendors...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-16 bg-white">
      {/* Section Title */}
      <h2
        className="text-center font-[Sora] font-bold text-[40.52px] leading-[56px] tracking-[0%] 
        text-gray-900 mb-10"
      >
        Top Gas Vendors in Estility
      </h2>

      {/* Vendor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 place-items-center">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex flex-col items-center text-center transition-transform hover:scale-105 duration-300"
          >
            {/* Vendor Logo */}
            {vendor.logo ? (
              <img
                src={vendor.logo.url}
                alt={vendor.name}
                className="w-[132px] h-[128px] object-contain rounded-full opacity-100 shadow-sm"
              />
            ) : (
              <div className="w-[132px] h-[128px] flex items-center justify-center bg-gray-200 rounded-full text-gray-500 mb-4">
                N/A
              </div>
            )}

            {/* Vendor Name */}
            {vendor.website ? (
              <a
                href={vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 bg-[#DFDDF6] rounded text-sm text-gray-800 font-medium hover:bg-[#c9c7f0] transition-colors"
              >
                {vendor.name}
              </a>
            ) : (
              <p className="px-2 py-1 bg-[#DFDDF6] rounded text-sm text-gray-800 font-medium">
                {vendor.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
