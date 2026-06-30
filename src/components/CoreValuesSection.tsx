import {
  Award, Eye, ShieldCheck, PiggyBank, Clock, Plane, GraduationCap, Heart,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const iconMap = [
  Award, Eye, ShieldCheck, PiggyBank, Clock, Plane, GraduationCap, Heart
];

export default function CoreValuesSection() {
  const { t, i18n } = useTranslation('core');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe text with fallbacks
  const badge = mounted ? t('section.badge', { defaultValue: "Our Principles" }) : "Our Principles";
  const title = mounted ? t('section.title', { defaultValue: "Why Choose Us" }) : "Why Choose Us";

  // Get values with fallback
  let values = [
    { label: "First-Class Service Providers" },
    { label: "Accurate & Perceptive" },
    { label: "Creditable & Trustworthy" },
    { label: "Cost-Saving Solutions" },
    { label: "Multi-tasked 24/7 Services" },
    { label: "Strong Airline Relationships" },
    { label: "Knowledgeable Workforce" },
    { label: "Unparalleled Customer Service" },
  ];

  if (mounted) {
    try {
      const translatedValues = t('values', { returnObjects: true });
      values = Array.isArray(translatedValues) ? translatedValues : values;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
    }
  }

  return (
    <section className="bg-muted/50 py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {values.map((v: { label: string }, i: number) => {
            const IconComponent = iconMap[i % iconMap.length];
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                  <IconComponent className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <p className="font-heading text-sm font-medium">{v.label}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}