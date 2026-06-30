import { Link } from "react-router-dom";
import { Compass, Car, Briefcase, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

const iconMap = [Compass, Plane, Briefcase];

export default function ServicesSection() {
  const { t, i18n } = useTranslation('service');
  
  // Get services array from translations
  const services = t('services', { returnObjects: true });

  return (
    <section id="services" className="py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t('section.badge')}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              {t('section.title')}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {Array.isArray(services) && services.map((service: any, i: number) => {
            const IconComponent = iconMap[i % iconMap.length];
            return (
              <AnimatedSection key={i} delay={i * 0.15}>
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-semibold">{service.title}</h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <Link to={service.link}>
                      <Button variant="outline" size="sm" className="font-heading">
                        {t('button')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}