import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigation } from "../../hooks/useNavigation";
import { CTAButton } from "./CTAButton"; 

export default function Navbar() {
  const { navigation, loading } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <div>Loading navigation...</div>;
  if (!navigation) return <div>No navigation data</div>;

  const { logo, links, cta_button } = navigation;
  const logoUrl = logo
    ? `${import.meta.env.VITE_API_URL}${logo.url}`
    : null;

  const sortedLinks = [...links].sort((a, b) => a.order - b.order);

  return (
    <nav className="bg-[#1D0B32] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div>
          {logoUrl && (
            <Link to="/">
              <img src={logoUrl} alt="Logo" className="h-10" />
            </Link>
          )}
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center h-[20px] gap-[35px]">
          {sortedLinks.map((link, idx) => (
            <motion.li
              key={link.id}
              className="flex items-center"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.7, -0.4, 0.4, 1.4] }}
            >
              <a
                href={link.url}
                className=" h-[20px] flex items-center justify-center text-white opacity-80 font-sora font-semibold text-[16px] leading-[20px] tracking-[-0.02em] px-2"
              >
                {link.label}
              </a>

              {idx !== sortedLinks.length - 1 && (
                <span className="text-[#FFFFFF] opacity-50 mx-2">|</span>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        {cta_button && (
          <div className="hidden md:inline-flex items-center ml-6">
            <CTAButton
              label={cta_button.label}
              url={cta_button.url}
              type={cta_button.variant === "secondary" ? "secondary" : "primary"}
              size="medium"
            />
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1D0B32] px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {sortedLinks.map((link) => (
              <motion.li
                key={link.id}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.7, -0.4, 0.4, 1.4] }}
              >
                <a
                  href={link.url}
                  className="w-full h-[20px] flex items-center justify-center text-white opacity-80 font-sora font-semibold text-[16px] leading-[20px] tracking-[-0.02em] px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile CTA */}
          {cta_button && (
            <div className="mt-4 w-full items-center">
              <CTAButton
                label={cta_button.label}
                url={cta_button.url}
                type={cta_button.variant === "secondary" ? "secondary" : "primary"}
                size="large"
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
