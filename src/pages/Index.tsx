import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DivisionsSection from "@/components/DivisionsSection";
import USPSection from "@/components/USPSection";
import AboutPreview from "@/components/AboutPreview";
import AirlinePartnersSection from "@/components/AirlinePartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import ContactSection from "@/components/ContactSection";
import VirtualConcierge from "@/components/VirtualConcierge";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import InstagramFeed from "@/components/InstagramFeed";
import ClientDashboard from "@/components/ClientDashboard";
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <USPSection />
        <SocialProof />
        <AirlinePartnersSection />
        <TestimonialsSection />
        <VirtualConcierge />
        <CoreValuesSection />
        <ContactSection />
      </main>
      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Index;
