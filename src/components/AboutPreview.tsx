import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect } from "react"; // Add this import

export default function AboutPreview() {
  const { t, i18n } = useTranslation('about');
  
  // ADD THIS DEBUG CODE
  useEffect(() => {
    console.log('=== ABOUT PREVIEW DEBUG ===');
    console.log('Current language:', i18n.language);
    console.log('Has about namespace:', i18n.hasResourceBundle(i18n.language, 'about'));
    console.log('Test title:', t('about.preview.title', { defaultValue: 'FALLBACK TITLE' }));
    console.log('All about translations:', i18n.getResourceBundle(i18n.language, 'about'));
  }, [i18n.language]);
  
  return (
    <section className="bg-muted/50 py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80"
                alt="Tanzania landscape"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t('about.preview.title', { defaultValue: "About Us" })}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              {t('about.preview.heading', { defaultValue: "Who We Are" })}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t('about.preview.description1', { defaultValue: "AA Travel & Tours Ltd has established a reputation as one of the best Tours and Travel operators in Tanzania. We aim to deliver complete customer satisfaction, leading to long-term client relationships. Our client is someone looking for that 'little bit extra.'" })}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t('about.preview.description2', { defaultValue: "We don't just offer the standard tourist itinerary but rather will tailor-make a customized itinerary to suit your needs, interests, and budget." })}
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-lg border bg-card p-4">
                <p className="font-heading text-sm font-semibold text-secondary">
                  {t('about.preview.mission.title', { defaultValue: "Our Mission" })}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('about.preview.mission.description', { defaultValue: "To be an easy and friendly company to deal with, understanding the frustrations of business travel and giving clients simple, quick, and efficient solutions." })}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-heading text-sm font-semibold text-secondary">
                  {t('about.preview.vision.title', { defaultValue: "Our Vision" })}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('about.preview.vision.description', { defaultValue: "To be a reputable market leader with continuous success in the travel and tourism industry." })}
                </p>
              </div>
            </div>
            <Link to="/about" className="mt-6 inline-block">
              <Button variant="outline" className="font-heading">
                {t('about.preview.readMore', { defaultValue: "Read More" })}
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}