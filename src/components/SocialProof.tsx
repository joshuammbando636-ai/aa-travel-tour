import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

const iconMap = [TrendingUp, Users, MapPin];

// Default fallback bookings (maintain original data)
const defaultBookings = [
  { name: "Sarah", from: "London", trip: "Serengeti Migration Safari" },
  { name: "Michael", from: "New York", trip: "Kilimanjaro Climbing" },
  { name: "Akiko", from: "Tokyo", trip: "Zanzibar Beach Holiday" },
  { name: "Hans", from: "Berlin", trip: "Ngorongoro Crater Tour" },
  { name: "Maria", from: "São Paulo", trip: "Gorilla Tracking Adventure" },
  { name: "James", from: "Sydney", trip: "Luxury Safari Package" },
  { name: "Fatima", from: "Dubai", trip: "Family Safari Experience" },
];

const defaultStats = [
  { value: "500+", label: "Trips This Year" },
  { value: "2,000+", label: "Happy Travelers" },
  { value: "50+", label: "Destinations" },
];

export default function SocialProof() {
  const { t, i18n } = useTranslation('proof');
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrent((c) => (c + 1) % bookings.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Get bookings with fallback
  let bookings = defaultBookings;
  let stats = defaultStats;

  if (mounted) {
    try {
      const translatedBookings = t('bookings', { returnObjects: true });
      bookings = Array.isArray(translatedBookings) ? translatedBookings : defaultBookings;
      
      const translatedStats = t('stats', { returnObjects: true });
      stats = Array.isArray(translatedStats) ? translatedStats : defaultStats;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
    }
  }

  const booking = bookings[current] || bookings[0];

  // Safe text with fallbacks
  const badge = mounted ? t('section.badge', { defaultValue: "Join Our Community" }) : "Join Our Community";
  const title = mounted ? t('section.title', { defaultValue: "Trusted by Travelers Worldwide" }) : "Trusted by Travelers Worldwide";
  const justBookedText = mounted ? t('bookingTicker.justBooked', { defaultValue: "just booked a" }) : "just booked a";
  const fromText = mounted ? t('bookingTicker.from', { defaultValue: "from" }) : "from";

  return (
    <section className="py-20 bg-muted/50" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {badge}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              {title}
            </h2>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => {
            const IconComponent = iconMap[i % iconMap.length];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-heading text-3xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Booking ticker */}
        <AnimatedSection delay={0.3}>
          <div className="mx-auto max-w-md overflow-hidden rounded-xl border bg-card p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {booking.name} {fromText} {booking.from}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {justBookedText} <span className="font-semibold text-primary">{booking.trip}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}