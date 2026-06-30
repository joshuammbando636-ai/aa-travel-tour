import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// Default fallback testimonials
const defaultTestimonials = [
  {
    name: "John M. Lukumbulu",
    company: "Llukumbulu Investment Limited",
    text: "AA Travel & Tours has been our trusted travel partner for years. Their attention to detail and personalized service is unmatched. Every trip is seamlessly organized.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    type: "family",
  },
  {
    name: "Sarah K. Mmari",
    company: "East Africa Ventures",
    text: "From our corporate travel needs to family safaris, AA Travel always delivers beyond expectations. Their local expertise makes all the difference.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    type: "luxury",
  },
  {
    name: "David R. Thompson",
    company: "International Visitor",
    text: "Our Kilimanjaro trek organized by AA Travel was the experience of a lifetime. The guides were knowledgeable, the logistics flawless, and the memories unforgettable.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    type: "family",
  },
  {
    name: "Grace N. Mushi",
    company: "Tanzanian Breweries Ltd",
    text: "Their corporate travel management has saved us both time and money. The 24/7 support means we never have to worry about last-minute changes.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    rating: 5,
    type: "luxury",
  },
  {
    name: "Michael & Jennifer Chen",
    company: "Honeymoon Travelers",
    text: "Our honeymoon safari exceeded all expectations! AA Travel arranged the most romantic lodges and unforgettable wildlife encounters. The perfect start to our marriage.",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
    rating: 5,
    type: "honeymoon",
  },
  {
    name: "The Anderson Family",
    company: "Family Safari",
    text: "Traveling with kids can be stressful, but AA Travel made it seamless. Our children learned so much and we created memories that will last forever. Highly recommend!",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    type: "family",
  },
  {
    name: "Robert Kimaro",
    company: "Adventure Seeker",
    text: "The budget safari was incredible value! Don't let the price fool you - the experience was world-class. Professional guides, great camps, and amazing wildlife.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    rating: 5,
    type: "family",
  },
];

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation('test');
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safely get testimonials with fallback
  let testimonials = defaultTestimonials;
  
  if (mounted) {
    try {
      const translatedTestimonials = t('testimonials', { returnObjects: true });
      testimonials = Array.isArray(translatedTestimonials) ? translatedTestimonials : defaultTestimonials;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
      testimonials = defaultTestimonials;
    }
  }

  const filteredTestimonials = filter === "all"
    ? testimonials
    : testimonials.filter((t: any) => t.type === filter);

  const displayedTestimonial = filteredTestimonials[current % filteredTestimonials.length] || testimonials[0];

  const prev = () => setCurrent((c) => (c - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  const next = () => setCurrent((c) => (c + 1) % filteredTestimonials.length);

  // Safe text with fallbacks
  const badge = mounted ? t('section.badge', { defaultValue: "Testimonials" }) : "Testimonials";
  const title = mounted ? t('section.title', { defaultValue: "What Our Clients Say" }) : "What Our Clients Say";
  const verified = mounted ? t('verified', { defaultValue: "VERIFIED" }) : "VERIFIED";

  return (
    <section className="py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {badge}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              {title}
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-8 flex justify-center">
            <Select value={filter} onValueChange={(val) => { setFilter(val); setCurrent(0); }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={mounted ? t('filter.placeholder') : "Filter by type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{mounted ? t('filter.all') : "All Safaris"}</SelectItem>
                <SelectItem value="family">{mounted ? t('filter.family') : "Family"}</SelectItem>
                <SelectItem value="luxury">{mounted ? t('filter.luxury') : "Luxury"}</SelectItem>
                <SelectItem value="honeymoon">{mounted ? t('filter.honeymoon') : "Honeymoon"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative mx-auto max-w-3xl">
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-start gap-4">
                  <img
                    src={displayedTestimonial.photo}
                    alt={displayedTestimonial.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-semibold">{displayedTestimonial.name}</p>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm text-primary">{displayedTestimonial.company}</p>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < displayedTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                    {verified}
                  </div>
                </div>

                <Quote className="mb-3 h-6 w-6 text-primary/30" />
                <p className="text-base italic leading-relaxed text-muted-foreground">
                  "{displayedTestimonial.text}"
                </p>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="rounded-full border p-2 transition-colors hover:bg-muted"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {filteredTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                    )}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="rounded-full border p-2 transition-colors hover:bg-muted"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}