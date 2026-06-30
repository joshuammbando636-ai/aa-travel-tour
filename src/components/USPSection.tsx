import { Shield, Clock, Plane, Sparkles, Users, PiggyBank } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const iconMap = [
  { icon: Shield },
  { icon: Clock },
  { icon: Plane },
  { icon: Sparkles },
  { icon: Users },
  { icon: PiggyBank }
];

// Default fallback points in case translations haven't loaded yet
const defaultPoints = [
  "100% Tanzanian Owned & Managed",
  "24/7 Customer Support",
  "Strong Airline Relationships",
  "Tailor-Made Experiences",
  "Knowledgeable Local Guides",
  "Cost-Saving Solutions"
];

export default function USPSection() {
  const { t, i18n } = useTranslation('home');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safely get points with fallback
  let points: string[] = defaultPoints;
  
  if (mounted) {
    try {
      const translatedPoints = t('usp.points', { returnObjects: true });
      points = Array.isArray(translatedPoints) ? translatedPoints : defaultPoints;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
      points = defaultPoints;
    }
  }

  // Safe badge and title with fallbacks
  const badge = mounted ? t('usp.badge', { defaultValue: "Why We Stand Out" }) : "Why We Stand Out";
  const title = mounted ? t('usp.title', { defaultValue: "Unique Selling Points" }) : "Unique Selling Points";

  return (
    <section className="py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {points.map((label: string, i: number) => {
            const IconComponent = iconMap[i % iconMap.length].icon;
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary hover:text-primary-foreground">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-sm font-medium leading-snug">{label}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}