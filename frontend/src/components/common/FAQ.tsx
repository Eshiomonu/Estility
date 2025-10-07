import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useFaq } from "../../hooks/home/useFAQ";

export default function FAQSection() {
  const {
    categories,
    selectedCategory,
    filteredFaqs,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCategorySelect,
  } = useFaq();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading FAQs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section className="bg-[#D7D5FD] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 font-sora">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Find quick answers to the most common questions about our services.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg shadow-md p-3 mb-10 max-w-xl mx-auto">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* FAQ Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column — Categories */}
          <div className="bg-white rounded-xl shadow-md p-5 h-fit">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat.Slug ?? "")}
                    className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedCategory?.Slug === cat.Slug
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — FAQs */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedCategory?.title || "Select a category"}
            </h3>

            {filteredFaqs.length === 0 ? (
              <p className="text-gray-500">No FAQs found for this category.</p>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border-b pb-3">
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === faq.id ? null : faq.id)
                      }
                      className="w-full flex justify-between items-center text-left"
                    >
                      <span className="font-medium text-gray-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === faq.id && (
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {faq.answers}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
