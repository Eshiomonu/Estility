import { useState } from "react";
import { useFAQ } from "../../hooks/home/useFAQ";

export default function FAQSection() {
  const { categories, loading, error, searchFAQs } = useFAQ();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchFAQs(value);
  };

  if (loading) return <p className="p-6 text-center">Loading FAQs...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="bg-[#D7D5FD] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg shadow-md p-2 mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search FAQs..."
            className="flex-1 px-3 py-2 rounded-md outline-none"
          />
          <button className="px-4 py-2 text-gray-600">
            🔍
          </button>
        </div>

        {/* Layout: Left categories | Right accordion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <ul className="space-y-3 font-medium">
              {categories.map((cat) => (
                <li key={cat.id} className="text-gray-800">
                  {cat.title}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ul className="ml-4 text-sm text-gray-600">
                      {cat.subcategories.map((sub, i) => (
                        <li key={i}>• {sub.title}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            {categories.map((cat) => (
              <div key={cat.id} className="mb-6">
                <h3 className="text-xl font-semibold mb-3">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.faqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <summary className="cursor-pointer font-medium">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
