import { useState } from "react";
import { X, Download, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  src: string;
  cat: string;
  title: string;
  credit: string;
}

const categories = [
  "National Parks",
  "Sunsets",
  "Zanzibar",
  "Big 5 & Wildlife",
  "Cultural",
];

const photos: Photo[] = [
  // NATIONAL PARKS
  { src: "images/endless.avif", cat: "National Parks", title: "Serengeti Endless Plains", credit: "Photo: Serengeti National Park" },
  { src: "images/panorama.avif", cat: "National Parks", title: "Ngorongoro Crater Panorama", credit: "Photo: Ngorongoro Conservation Area" },
  { src: "images/baobab.avif", cat: "National Parks", title: "Tarangire Baobab Trees", credit: "Photo: Tarangire National Park" },
  { src: "images/travel.avif", cat: "National Parks", title: "Safari Vehicle on Dusty Trail", credit: "Photo: Tanzania Safari Experience" },
  { src: "images/atdawn.avif", cat: "National Parks", title: "Kilimanjaro at Dawn", credit: "Photo: Mount Kilimanjaro" },

  // SUNSETS
  { src: "images/sunset.avif", cat: "Sunsets", title: "Golden Serengeti Sunset", credit: "Photo: Serengeti at Dusk" },
  { src: "images/twilight.avif", cat: "Sunsets", title: "African Savanna Twilight", credit: "Photo: Tanzania Golden Hour" },
  { src: "images/acacia.jpg", cat: "Sunsets", title: "Acacia Silhouette Sunset", credit: "Photo: Crater Rim Sunset" },
  { src: "images/bon.avif", cat: "Sunsets", title: "Safari Campfire Sunset", credit: "Photo: Bush Camp Evening" },
  { src: "images/dhow.avif", cat: "Sunsets", title: "Zanzibar Dhow Sunset", credit: "Photo: Indian Ocean Sunset" },

  // ZANZIBAR
  { src: "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg", cat: "Zanzibar", title: "Nungwi Beach Paradise", credit: "Photo: Nungwi, Zanzibar" },
  { src: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg", cat: "Zanzibar", title: "Crystal Clear Waters", credit: "Photo: Kendwa Beach" },
  { src: "images/trad.avif", cat: "Zanzibar", title: "Traditional Dhow Sailing", credit: "Photo: Zanzibar Dhow Cruise" },
  { src: "images/stone.avif", cat: "Zanzibar", title: "Stone Town Architecture", credit: "Photo: UNESCO World Heritage" },
  { src: "images/indian.avif", cat: "Zanzibar", title: "Turquoise Indian Ocean", credit: "Photo: Mnemba Island" },

  // BIG 5 & WILDLIFE
  { src: "https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_1280.jpg", cat: "Big 5 & Wildlife", title: "Lion Pride in Serengeti, 2024", credit: "Photo: Serengeti Lion Research" },
  { src: "images/eleph.avif", cat: "Big 5 & Wildlife", title: "African Elephant Family", credit: "Photo: Tarangire Elephants" },
  { src: "images/cheat.avif", cat: "Big 5 & Wildlife", title: "Cheetah on the Hunt", credit: "Photo: Serengeti Cheetah" },
  { src: "https://cdn.pixabay.com/photo/2017/04/11/21/34/giraffe-2222908_1280.jpg", cat: "Big 5 & Wildlife", title: "Giraffe at Sunset", credit: "Photo: Serengeti Giraffe" },
  { src: "images/leo.avif", cat: "Big 5 & Wildlife", title: "Leopard in Acacia Tree", credit: "Photo: Serengeti Predator" },
  { src: "images/zebmi.avif", cat: "Big 5 & Wildlife", title: "Zebra Migration Herds", credit: "Photo: Great Migration" },
  { src: "images/hippo.avif", cat: "Big 5 & Wildlife", title: "Hippos in the River", credit: "Photo: Grumeti River" },
  { src: "images/cross.avif", cat: "Big 5 & Wildlife", title: "Wildebeest Crossing", credit: "Photo: Mara River Crossing" },
  { src: "images/crown.avif", cat: "Big 5 & Wildlife", title: "Crowned Crane in Flight", credit: "Photo: Tanzanian Birdlife" },

  // CULTURAL
  { src: "images/warriors.avif", cat: "Cultural", title: "Maasai Warriors", credit: "Photo: Maasai Cultural Visit" },
  { src: "images/market.avif", cat: "Cultural", title: "Local Market Colors", credit: "Photo: Arusha Market" },
  { src: "images/spice.avif", cat: "Cultural", title: "Spice Plantation Tour", credit: "Photo: Zanzibar Spice Farm" },
  { src: "images/dan.jpg", cat: "Cultural", title: "Traditional Dance", credit: "Photo: Tanzanian Heritage" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("National Parks");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = photos.filter((p) => p.cat === filter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const nextPhoto = () => lightbox !== null && setLightbox((lightbox + 1) % filtered.length);
  const prevPhoto = () => lightbox !== null && setLightbox((lightbox - 1 + filtered.length) % filtered.length);

  const downloadPhoto = (src: string, title: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-wallpaper.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('images/gallery.avif')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Photo Gallery</h1>
          <p className="mt-2 text-lg text-white/80">Stunning captures from across Tanzania — click to view full-screen</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="font-heading text-xs"
              >
                {cat}
                {filter !== cat && (
                  <span className="ml-1 text-muted-foreground">
                    ({photos.filter((p) => p.cat === cat).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((photo, i) => (
            <AnimatedSection key={photo.src + filter} delay={Math.min(i * 0.03, 0.3)}>
              <div
                className="mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid group relative"
                onClick={() => openLightbox(i)}
                style={{ minHeight: "250px" }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  style={{ minWidth: "400px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ZoomIn className="h-4 w-4 text-white/80" />
                    <span className="text-white font-heading text-sm font-semibold">{photo.title}</span>
                  </div>
                  <span className="text-white/60 text-xs">{photo.credit}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </main>

      {/* Full-screen Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-2xl bg-black/60 px-6 py-3 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
              <div className="text-center">
                <p className="text-white font-heading text-sm font-semibold">{filtered[lightbox].title}</p>
                <p className="text-white/50 text-xs">{filtered[lightbox].credit}</p>
              </div>
              <button
                onClick={() => downloadPhoto(filtered[lightbox].src, filtered[lightbox].title)}
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
              >
                <Download className="h-3 w-3" /> Wallpaper
              </button>
            </div>

            <div className="absolute top-4 left-4 text-white/50 text-sm font-heading">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
