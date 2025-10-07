import {
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
} from "lucide-react";
import { useFooter } from "../../hooks/useFooter";
import { CTAButton } from "../../components/common/CTAButton"; 
import { JSX } from "react";

const platformIcons: Record<string, JSX.Element> = {
  instagram: <InstagramIcon size={20} />,
  twitter: <TwitterIcon size={20} />,
  linkedin: <LinkedinIcon size={20} />,
  facebook: <FacebookIcon size={20} />,
};

export default function Footer() {
  const { footer, loading } = useFooter();

  if (loading) return <div className="text-center p-6">Loading footer...</div>;
  if (!footer) return <div className="text-center p-6">No footer data available</div>;

  const logoUrl = footer.logo ? `${import.meta.env.VITE_API_URL}${footer.logo.url}` : null;

  return (
    <footer className="bg-[#1D0B32] text-white">
      
      {/* New Promo Section */}
      {footer.promo && (
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          {footer.promo.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{footer.promo.title}</h2>
          )}
          {footer.promo.description && (
            <p className="text-gray-300 mb-6">{footer.promo.description}</p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {footer.promo.cta?.map((cta) => (
              <CTAButton
                key={cta.id}
                label={cta.label}
                url={cta.url}
                type={cta.variant === "secondary" ? "secondary" : "primary"}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 py-16 px-6 md:px-20 text-center md:text-left">
        
        {/* Column 1: Logo & Socials */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 w-auto mx-auto md:mx-0" />}
          <p className="text-sm text-gray-400 mt-4">
            © {new Date().getFullYear()} {footer.copyright_text}. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            {footer.social_links?.map((s) => (
              <a key={s.id} href={s.url} className="hover:text-gray-300">
                {platformIcons[s.platform.toLowerCase()] ?? null}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {footer.company_links?.map((link) => (
              <li key={link.id}>
                <a href={link.url} className="hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {footer.support_links?.map((link) => (
              <li key={link.id}>
                <a href={link.url} className="hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {footer.legal_links?.map((link) => (
              <li key={link.id}>
                <a href={link.url} className="hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Stay up to date</h3>
          {footer.newsletter_text && (
            <p className="text-sm text-gray-400 mb-2">{footer.newsletter_text}</p>
          )}
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="your email address"
              className="px-4 py-2 rounded-md bg-transparent border border-gray-500 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-white text-[#1D0B32] font-medium hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
