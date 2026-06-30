import { Instagram } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

// Default fallback photos
const defaultPhotos = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80",
    alt: "Serengeti sunset",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80",
    alt: "Wildlife encounter",
  },
  {
    id: 3,
    image: "images/airlines/tz.jpg",
    alt: "Kilimanjaro climb",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80",
    alt: "Zanzibar beach",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=80",
    alt: "Safari vehicle",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&q=80",
    alt: "Mountain gorilla",
  },
];

export default function InstagramFeed() {
  const { t, i18n } = useTranslation('ig');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe text with fallbacks
  const title = mounted ? t('section.title', { defaultValue: "Follow Our Adventures" }) : "Follow Our Adventures";
  const subtitle = mounted ? t('section.subtitle', { defaultValue: "@AATravelTanzania on Instagram" }) : "@AATravelTanzania on Instagram";
  const buttonText = mounted ? t('section.button', { defaultValue: "Follow Us on Instagram" }) : "Follow Us on Instagram";

  // Get photos with fallback
  let instagramPhotos = defaultPhotos;
  
  if (mounted) {
    try {
      const translatedPhotos = t('photos', { returnObjects: true });
      instagramPhotos = Array.isArray(translatedPhotos) ? translatedPhotos : defaultPhotos;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
    }
  }

  return (
    <section className="py-16 bg-muted/30" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Instagram className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {title}
              </h2>
            </div>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramPhotos.map((photo: { id: number; image: string; alt: string }, i: number) => (
            <AnimatedSection key={photo.id} delay={i * 0.05}>
              <div className="group relative block aspect-square overflow-hidden rounded-lg cursor-default">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                  <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 text-center">
            <a
              href="https://instagram.com/aatraveltz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-3 font-heading font-semibold text-white transition-transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
              {buttonText}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}