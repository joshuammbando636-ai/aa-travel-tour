import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock, UserCheck, BadgeDollarSign, Hotel, Shield, HandHelping, 
  FileCheck, CreditCard, Plane, Receipt, Briefcase, Globe, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

const iconMap = [
  Plane, Clock, UserCheck, BadgeDollarSign, Hotel, 
  Shield, HandHelping, FileCheck, CreditCard, Receipt
];

export default function CorporateTravelPage() {
  const { t, i18n } = useTranslation('CMT');
  const services = t('services.items', { returnObjects: true });

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative flex h-[50vh] items-end bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <AnimatedSection>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {t('hero.title')}
            </h1>
            <p className="mt-2 text-base text-white/80 max-w-2xl">
              {t('hero.subtitle')}
            </p>
            
            {/* Simplified buttons - only one CTA */}
            <div className="mt-6">
         
            </div>
          </AnimatedSection>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Section title */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{t('services.title')}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {Array.isArray(services) && services.map((service, i) => {
            const IconComponent = iconMap[i % iconMap.length];
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg border border-primary/5 hover:border-primary/20">
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-1.5 font-heading text-sm font-semibold">{service.title}</h3>
                    <p className="flex-1 text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Simplified CTA Section */}
        <AnimatedSection delay={0.2}>
          <div className="text-center bg-primary/5 rounded-xl p-8">
            <Briefcase className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold md:text-2xl mb-2">
              {t('cta.title')}
            </h3>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground mb-5">
              {t('cta.subtitle')}
            </p>
            
            {/* Single contact button */}
            <Link to="/contact">
              <Button className="font-heading font-semibold">
                {t('cta.button')}
              </Button>
            </Link>
            
            {/* Simple contact info */}
            <p className="mt-4 text-xs text-muted-foreground">
              {t('cta.email')}: <a href="mailto:info@aatravel.co.tz" className="text-primary hover:underline">info@aatravel.co.tz</a> | 
              {t('cta.phone')}: <a href="tel:+255752108011" className="text-primary hover:underline">+255 752 108 011</a>
            </p>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}