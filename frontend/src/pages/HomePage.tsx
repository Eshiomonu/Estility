import HeroSection from "../components/home/HeroSection";
import WhyIsBuilt from "../components/home/WhyEstility";
import WhoIsBuiltForSection from "../components/home/WhoIsBuiltForSection";
import HowItWorks from "../components/home/HowItWorks";
import TopVendors from "../components/home/TopVendors";
import Faq from "../components/home/FAQ";
import Testimony from "../components/home/Testimony";
// import PartnerSection from "../components/home/PartnerSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhyIsBuilt />
      <WhoIsBuiltForSection />
      <HowItWorks />
      <TopVendors />
      <Faq />
      <Testimony />
      {/* <PartnerSection /> */}
    </div>
  );
}