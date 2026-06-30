import { useState } from "react";
import { X, ZoomIn, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const tours = [
  {
    title: "Serengeti Plains",
    img: "images/serengeti plain.avif",
    desc: "Endless grasslands teeming with wildlife — the world's greatest natural spectacle.",
  },
  {
    title: "Ngorongoro Crater",
    img: "images/ngorongoro.avif",
    desc: "A self-contained ecosystem inside the world's largest inactive volcanic caldera.",
  },
  {
    title: "Zanzibar Beach",
    img: "images/zanzibar beach.avif",
    desc: "Crystal-clear turquoise waters and pristine white sand beaches.",
  },
  {
    title: "Mount Kilimanjaro",
    img: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=80",
    desc: "The roof of Africa — snow-capped peaks above the clouds.",
  },
  {
    title: "Tarangire National Park",
    img: "images/tarangire.avif",
    desc: "Ancient baobab trees and massive elephant herds.",
  },
  {
    title: "Lake Manyara",
    img: "images/lake manyar.avif",
    desc: "Famous for tree-climbing lions and flamingo-lined shores.",
  },
  {
    title: "Selous Game Reserve",
    img: "images/selous 1.avif",
    desc: "Africa's largest game reserve — boat safaris and untouched wilderness.",
  },
  {
    title: "Maasai Cultural Village",
    img: "images/masai.avif",
    desc: "Traditional Maasai homesteads and vibrant cultural heritage.",
  },
];

export default function VirtualToursPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('images/planner.avif')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Virtual Safari Tours</h1>
          <p className="mt-2 text-lg text-white/80">Explore Tanzania from anywhere in the world</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Click any destination to open an immersive panoramic view. Use your mouse to pan around and zoom in to explore the stunning landscapes of Tanzania.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.map((tour, i) => (
            <AnimatedSection key={tour.title} delay={i * 0.1}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg" onClick={() => { setSelected(i); setZoom(1); }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={tour.img} alt={tour.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading text-base font-semibold">{tour.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{tour.desc}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </main>

      {/* Lightbox viewer */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={tours[selected].img}
                alt={tours[selected].title}
                className="max-h-[85vh] w-auto rounded-lg transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
                draggable={false}
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" onClick={() => setZoom((z) => Math.min(z + 0.5, 3))} className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => setSelected(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-white">
                <Move className="h-4 w-4" />
                <span className="text-sm">{tours[selected].title} — Drag to pan, click + to zoom</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
