import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function AirlinePartnersSection() {
  const { t, i18n } = useTranslation('airline');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe text with fallbacks
  const badge = mounted ? t('section.badge', { defaultValue: "Trusted Partnerships" }) : "Trusted Partnerships";
  const title = mounted ? t('section.title', { defaultValue: "Our Airline Partners" }) : "Our Airline Partners";
  const subtitle = mounted ? t('section.subtitle', { defaultValue: "Strong GSA division with exclusive airline partnerships. We negotiate corporate deals, group fares, and special rates for our clients." }) : "Strong GSA division with exclusive airline partnerships. We negotiate corporate deals, group fares, and special rates for our clients.";

  // Get partners with fallback
  let airlinePartners = [
    { name: "South African Airways", img: "/images/logo/south.png" },
    { name: "American Airlines", img: "/images/logo/america.png" },
    { name: "Kenya Airways", img: "/images/logo/kenya.png" },
    { name: "Qatar Airways", img: "/images/logo/qatar.png" },
    { name: "Air Canada", img: "/images/logo/canada.png" },
    { name: "Turkish Airlines", img: "/images/logo/turkish.png" },
    { name: "Tanzania Airlines", img: "/images/logo/tz.jpeg" },
    { name: "Swiss Airlines", img: "/images/logo/swiss.png" },
    { name: "France Airlines", img: "/images/logo/france.png" },
    { name: "Precision Airlines", img: "/images/logo/precision.png" },
    { name: "Delta Airlines", img: "/images/logo/delta.png" },
    { name: "British Airways", img: "/images/logo/british.png" },
    { name: "KLM Airlines", img: "/images/logo/klm.png" },
    { name: "Emirates Airlines", img: "/images/logo/emirates.png" },
    { name: "Airlink Airlines", img: "/images/logo/air.png" },
    { name: "Malaysia Airlines", img: "/images/logo/malaysia.png" },
    { name: "Etihad Airlines", img: "/images/logo/etihad.png" },
  ];

  if (mounted) {
    try {
      const translatedPartners = t('partners', { returnObjects: true });
      airlinePartners = Array.isArray(translatedPartners) ? translatedPartners : airlinePartners;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
    }
  }

  // Duplicate for seamless loop
  const duplicatedLogos = [...airlinePartners, ...airlinePartners, ...airlinePartners, ...airlinePartners];

  return (
    <section className="py-16 bg-amber-50 overflow-hidden" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
              {badge}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl text-amber-800">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-amber-600/80">
              {subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Infinite rotating logos - Right to Left */}
        <AnimatedSection delay={0.2}>
          <div className="relative">
            {/* Left fade - logos disappear here */}
            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none" />
            
            {/* Right fade - logos appear from here */}
            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="overflow-hidden">
              <div className="flex gap-8 py-6 animate-infinite-scroll">
                {duplicatedLogos.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md border border-amber-200 p-3 hover:scale-110 transition-transform duration-300"
                  >
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('text-amber-700', 'font-bold', 'text-xs', 'text-center');
                        e.currentTarget.parentElement!.innerText = partner.name;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Fixed Animation - Seamless Loop */}
      <style>{`
        @keyframes infiniteScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-200px * ${airlinePartners.length}));
          }
        }
        
        .animate-infinite-scroll {
          animation: infiniteScroll 40s linear infinite;
          width: fit-content;
        }

        /* Pause animation on hover */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}