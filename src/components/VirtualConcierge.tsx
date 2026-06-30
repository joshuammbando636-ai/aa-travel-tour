import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

// Default fallback FAQs in case translations haven't loaded yet
const defaultFaqs = [
  {
    q: "Do I need a visa to visit Tanzania?",
    a: "Most visitors need a visa. You can get a visa on arrival at major entry points or apply online at immigration.go.tz. US, UK, and EU citizens typically receive a 90-day single-entry visa for $50. We assist all our clients with visa processing.",
  },
  {
    q: "When is the best time to visit Tanzania?",
    a: "June–October is peak safari season (dry, great wildlife viewing). January–February is calving season in the Serengeti. The Great Migration river crossings happen July–September. Zanzibar is best June–October and December–February.",
  },
  {
    q: "What should I pack for a safari?",
    a: "Neutral-colored clothing (khaki, olive, beige), layers for cool mornings, a wide-brimmed hat, sunscreen (SPF 50+), insect repellent, binoculars, a good camera with zoom lens, comfortable walking shoes, and a light rain jacket.",
  },
  {
    q: "Is Tanzania safe for tourists?",
    a: "Tanzania is one of the safest countries in East Africa for tourists. Standard precautions apply: use registered tour operators (like us!), avoid walking alone at night in cities, and keep valuables secure. Our guides ensure your safety throughout.",
  },
  {
    q: "What currency is used in Tanzania?",
    a: "The Tanzanian Shilling (TZS) is the local currency. US dollars are widely accepted at hotels, lodges, and for safari payments. ATMs are available in major cities. We recommend carrying small bills for tips and local purchases.",
  },
  {
    q: "Do I need vaccinations?",
    a: "Yellow fever vaccination is required if traveling from an endemic country. Recommended: Hepatitis A & B, Typhoid, and anti-malaria prophylaxis. Consult your travel doctor at least 6 weeks before departure. We provide a full health advisory.",
  },
];

export default function VirtualConcierge() {
  const { t, i18n } = useTranslation('conv');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safely get FAQs with fallback
  let faqs = defaultFaqs;
  
  if (mounted) {
    try {
      const translatedFaqs = t('faqs', { returnObjects: true });
      faqs = Array.isArray(translatedFaqs) ? translatedFaqs : defaultFaqs;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
      faqs = defaultFaqs;
    }
  }

  // Safe text with fallbacks
  const badge = mounted ? t('section.badge', { defaultValue: "Travel Concierge" }) : "Travel Concierge";
  const title = mounted ? t('section.title', { defaultValue: "Frequently Asked Questions" }) : "Frequently Asked Questions";
  const subtitle = mounted ? t('section.subtitle', { defaultValue: "Everything you need to know before your Tanzania adventure" }) : "Everything you need to know before your Tanzania adventure";
  const footerText = mounted ? t('footer.text', { defaultValue: "Have more questions? We're here to help!" }) : "Have more questions? We're here to help!";

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
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq: { q: string; a: string }, i: number) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border bg-card px-6">
                  <AccordionTrigger className="font-heading text-sm font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                {footerText}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {/* You can add buttons here if needed */}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}