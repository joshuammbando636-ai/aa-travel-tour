import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Compass, Camera, Users, Moon, Sun, MapPin, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const safariDestinations = [
  {
    nameKey: "destinations.serengeti.name",
    descriptionKey: "destinations.serengeti.description",
    images: [
      "images/serengeti plain.avif",
    ],
    highlights: [
      { key: "destinations.serengeti.highlights.migration" },
      { key: "destinations.serengeti.highlights.bigCats" },
      { key: "destinations.serengeti.highlights.plains" }
    ]
  },
  {
    nameKey: "destinations.ngorongoro.name",
    descriptionKey: "destinations.ngorongoro.description",
    images: [
      "images/crater.avif",
    ],
    highlights: [
      { key: "destinations.ngorongoro.highlights.unesco" },
      { key: "destinations.ngorongoro.highlights.crater" },
      { key: "destinations.ngorongoro.highlights.rhinos" }
    ]
  },
  {
    nameKey: "destinations.tarangire.name",
    descriptionKey: "destinations.tarangire.description",
    images: [
      "images/tarangire.avif",
      "images/logo/slideshow/ant.jpeg",
      "images/logo/slideshow/buf.jpeg",
      "images/logo/slideshow/cu.jpeg",
      "images/logo/slideshow/gif.jpeg",
      "images/logo/slideshow/giff.jpeg",
      "images/logo/slideshow/isee.jpeg",
      "images/logo/slideshow/lal.jpeg",
      "images/logo/slideshow/smile.jpeg",
      "images/logo/slideshow/tembo.jpeg",
      "images/logo/slideshow/tired.jpeg",
      "images/logo/slideshow/water.jpeg",
      "images/logo/slideshow/whatthe.jpeg",
      "images/logo/slideshow/yoo.jpeg",
      "images/logo/slideshow/zeb.jpeg"
    ],
    highlights: [
      { key: "destinations.tarangire.highlights.elephants" },
      { key: "destinations.tarangire.highlights.baobab" },
      { key: "destinations.tarangire.highlights.birds" }
    ]
  },
  {
    nameKey: "destinations.kilimanjaro.name",
    descriptionKey: "destinations.kilimanjaro.description",
    images: [
      "images/kili.avif",
    ],
    highlights: [
      { key: "destinations.kilimanjaro.highlights.peak" },
      { key: "destinations.kilimanjaro.highlights.views" },
      { key: "destinations.kilimanjaro.highlights.photography" }
    ]
  }
];

const safariExperiences = [
  {
    titleKey: "packages.experiences.lodges.title",
    descriptionKey: "packages.experiences.lodges.description",
    icon: Moon
  },
  {
    titleKey: "packages.experiences.camps.title",
    descriptionKey: "packages.experiences.camps.description",
    icon: Sun
  },
  {
    titleKey: "packages.experiences.family.title",
    descriptionKey: "packages.experiences.family.description",
    icon: Users
  },
  {
    titleKey: "packages.experiences.honeymoon.title",
    descriptionKey: "packages.experiences.honeymoon.description",
    icon: Camera
  }
];

const ImageSlideshow = ({ images, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-10" />
      {images.map((image, index) => (
        <motion.img
          key={image}
          src={image}
          alt={`${name} - View ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      ))}
      
      {/* Image indicators */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "w-6 bg-white" 
                : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ExplorerSection() {
  const { t, i18n } = useTranslation('explorer');

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      {/* Introduction Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {t('intro.badge')}
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
                {t('intro.title')}
              </h2>
              <div className="mt-8 space-y-6 text-lg text-muted-foreground">
                <p>
                  {t('intro.description1')}
                </p>
                <p className="font-medium text-foreground">
                  {t('intro.description2')}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h3 className="mb-12 text-center font-heading text-2xl font-bold md:text-3xl">
              {t('destinations.title')}
            </h3>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {safariDestinations.map((destination, index) => (
              <AnimatedSection key={destination.nameKey} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl"
                >
                  <ImageSlideshow 
                    images={destination.images} 
                    name={t(destination.nameKey)} 
                  />
                  <div className="p-6">
                    <h4 className="font-heading text-xl font-bold">{t(destination.nameKey)}</h4>
                    <p className="mt-2 text-base text-muted-foreground">{t(destination.descriptionKey)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {destination.highlights.map((highlight) => (
                        <span
                          key={highlight.key}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {t(highlight.key)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Packages Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h3 className="font-heading text-2xl font-bold md:text-3xl">
                {t('packages.title')}
              </h3>
              <p className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground">
                {t('packages.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {safariExperiences.map((experience, index) => (
              <AnimatedSection key={experience.titleKey} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <experience.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="mt-4 font-heading text-lg font-semibold">{t(experience.titleKey)}</h4>
                  <p className="mt-2 text-base text-muted-foreground">{t(experience.descriptionKey)}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <h3 className="font-heading text-3xl font-bold">{t('whyUs.title')}</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Compass className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold">{t('whyUs.locallyOwned.title')}</h4>
                      <p className="text-base text-muted-foreground">
                        {t('whyUs.locallyOwned.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold">{t('whyUs.authentic.title')}</h4>
                      <p className="text-base text-muted-foreground">
                        {t('whyUs.authentic.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold">{t('whyUs.fullService.title')}</h4>
                      <p className="text-base text-muted-foreground">
                        {t('whyUs.fullService.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative h-[500px] overflow-hidden rounded-2xl">
                <img
                  src="images/fam.avif"
                  alt="Safari Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-lg font-medium">
                    {t('whyUs.quote')}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h3 className="font-heading text-3xl font-bold md:text-4xl">
              {t('closing.title')}
            </h3>
            <p className="mt-6 text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('closing.subtitle')}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="/contact"
                className="rounded-full bg-white px-8 py-3 font-heading font-semibold text-primary transition-all hover:bg-white/90"
              >
                {t('closing.buttons.plan')}
              </a>
              <a
                href="#"
                className="rounded-full border-2 border-white px-8 py-3 font-heading font-semibold text-white transition-all hover:bg-white/10"
              >
                {t('closing.buttons.explore')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}