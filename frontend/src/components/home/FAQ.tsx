import { useFaq } from "../../hooks/home/useFAQ";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
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

  if (loading)
    return <p className="text-center text-gray-500 py-10">Loading FAQs...</p>;
  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* --- Section Title --- */}
        <h2 className="text-[40.52px] font-bold text-center mb-8 font-sora text-gray-800 leading-[56px]">
          Frequently Asked Questions
        </h2>

        {/* --- Search Bar --- */}
        <div className="flex items-center bg-white rounded-lg shadow p-3 max-w-md mx-auto mb-10">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* --- FAQ Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* --- Left Column: Categories --- */}
          <div className="bg-white shadow-md rounded-xl p-5 h-fit">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
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
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Right Column: Questions --- */}
          <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedCategory?.title || "Select a category"}
            </h3>

            {filteredFaqs.length === 0 ? (
              <p className="text-gray-500">No FAQs found.</p>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border-b border-gray-200 pb-3 last:border-none"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
                    >
                      <span className="font-medium text-gray-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 mt-2 leading-relaxed">
                            {faq.answers}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
