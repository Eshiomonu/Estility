import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Import your pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PartnerPage from "./pages/PartnerPage";
import RiderPage from "./pages/RidersPage";
import VendorPage from "./pages/VendorsPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermOfServicePage from "./pages/TermsOfServicePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content grows to fill available space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/rider" element={<RiderPage />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermOfServicePage />} />
          </Routes>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
