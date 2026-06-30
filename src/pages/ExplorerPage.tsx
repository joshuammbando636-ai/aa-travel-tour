import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExplorerSection from "@/components/ExplorerSection";

export default function ExplorerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <header 
        className="relative flex h-[60vh] items-end bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-16">
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">Our Safaris</h1>
          <p className="mt-4 max-w-2xl text-xl text-white/90">
            Discover the wild heart of Tanzania — from the Serengeti to Kilimanjaro
          </p>
        </div>
      </header>

      <main>
        <ExplorerSection />
      </main>
      <Footer />
    </div>
  );
}