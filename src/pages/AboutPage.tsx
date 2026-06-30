import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoreValuesSection from "@/components/CoreValuesSection";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t, i18n } = useTranslation('about');

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <header className="relative flex h-[50vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">{t('header.title')}</h1>
          <p className="mt-2 text-lg text-white/80">{t('header.subtitle')}</p>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
                  alt={t('header.title')}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl font-bold">{t('whoWeAre.title')}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t('whoWeAre.paragraph1')}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t('whoWeAre.paragraph2')}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t('whoWeAre.paragraph3')}
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-secondary">{t('mission.title')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('mission.description')}
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-secondary">{t('vision.title')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('vision.description')}
                  </p>
                </div>
              </div>

              <Link to="/contact" className="mt-8 inline-block">
                <Button className="font-heading font-semibold">{t('cta.button')}</Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        <CoreValuesSection />
      </main>
      <Footer />
    </div>
  );
}