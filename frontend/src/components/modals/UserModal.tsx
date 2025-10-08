import { useState } from "react";
import { useUserModal } from "../../hooks/home/useUserModal";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "../common/CTAButton";

export default function UserModal() {
  const { data, loading, error } = useUserModal();
  const [showModal, setShowModal] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  if (loading || error || !data) return null;

  const baseUrl = import.meta.env.VITE_API_URL;

  const imageUrl = data.image?.data?.attributes?.url
    ? `${baseUrl}${data.image.data.attributes.url}`
    : undefined;

  const barcodeUrl = data.barcode?.data?.attributes?.url
    ? `${baseUrl}${data.barcode.data.attributes.url}`
    : undefined;

  return (
    <>
      <CTAButton
        label={data.cta_text}
        onClick={() => setShowModal(true)}
        size="large"
        type="primary"
      />

      {/* --- MODAL 1 --- */}
      <AnimatePresence>
        {showModal && !showBarcode && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              <h2 className="text-2xl font-bold text-[#1D0B32] mb-3">
                {data.title}
              </h2>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Modal Visual"
                  className="rounded-xl mb-4 mx-auto max-h-64 object-contain"
                />
              )}

              {data.description && (
                <p className="text-gray-600 text-sm mb-5">{data.description}</p>
              )}

              <div className="flex justify-center gap-4 mb-5">
                {data.playstore_link && (
                  <a href={data.playstore_link} target="_blank" rel="noreferrer">
                    <img
                      src="/images/playstore-badge.png"
                      alt="Google Play"
                      className="h-12 w-auto"
                    />
                  </a>
                )}
                {data.appstore_link && (
                  <a href={data.appstore_link} target="_blank" rel="noreferrer">
                    <img
                      src="/images/appstore-badge.png"
                      alt="App Store"
                      className="h-12 w-auto"
                    />
                  </a>
                )}
              </div>

              <CTAButton
                label={data.cta_text}
                onClick={() => {
                  setShowBarcode(true);
                  setShowModal(false);
                }}
                size="large"
                type="secondary"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2 --- */}
      <AnimatePresence>
        {showBarcode && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-gray-800"
                onClick={() => setShowBarcode(false)}
              >
                ×
              </button>

              {barcodeUrl && (
                <img
                  src={barcodeUrl}
                  alt="QR Code"
                  className="mx-auto mb-6 rounded-xl max-h-60 object-contain"
                />
              )}

              <CTAButton
                label={data.barcode_cta_text || "Download App"}
                url={data.barcode_cta_link || "#"}
                size="large"
                type="primary"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

