import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
    alt: "Serengeti sunset with acacia trees",
  },
  {
    url: "images/airlines/tz.jpg",
    alt: "Mount Kilimanjaro at sunrise",
  },
  {
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80",
    alt: "Zanzibar tropical beach",
  },
  {
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
    alt: "Safari vehicle on the savanna",
  },
];

export default function HeroSection() {
  const { t, i18n } = useTranslation('common');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  // Split title to insert highlighted span
  const titleParts = t('hero.title').split(t('hero.titleHighlight'));

  return (
    <section className="relative h-screen w-full overflow-hidden" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      {/* Slides with Ken Burns effect */}
      <AnimatePresence initial={false}>
        {slides.map((slide, i) => (
          i === current && (
            <motion.div
              key={i}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.url}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Animated gradient overlay */}
      <motion.div 
        animate={{ 
          background: [
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Content with staggered animations */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-3 font-heading text-sm font-medium uppercase tracking-[0.3em] text-primary"
        >
          {t('hero.badge')}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          {titleParts[0]}
          <span className="text-primary relative inline-block">
            {t('hero.titleHighlight')}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
            />
          </span>
          {titleParts[1]}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="font-heading text-base font-semibold relative overflow-hidden group bg-primary hover:bg-primary/90 text-white">
                <span className="relative z-10">{t('hero.buttons.plan')}</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/safaris">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 font-heading text-base font-semibold text-black dark:text-white hover:bg-white/10"
              >
                {t('hero.buttons.explore')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all cursor-pointer",
              i === current ? "bg-primary" : "bg-white/50 hover:bg-white/80"
            )}
            style={{ width: i === current ? 32 : 8, height: 8 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <motion.button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
        whileHover={{ scale: 1.1, x: i18n.language === "ar" ? 2 : -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>
      
      <motion.button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
        whileHover={{ scale: 1.1, x: i18n.language === "ar" ? -2 : 2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </section>
  );
}