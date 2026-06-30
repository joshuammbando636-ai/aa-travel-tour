import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
          <p className="mt-2 text-lg text-white/80">We'd love to hear from you — Karibu Sana!</p>
        </div>
      </header>

      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}