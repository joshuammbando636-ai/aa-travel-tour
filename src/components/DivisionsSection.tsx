import { Plane, Map, Airplay } from "lucide-react"; // Using Plane icon for airticketing
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";

const divisions = [
  {
    icon: Plane,
    title: "AA Travel Holidays",
    desc: "International holiday packages, airline holiday packages, short breaks & adventure holidays. In-house tailor-made packages to worldwide destinations.",
  },
  {
    icon: Map,
    title: "AA Travel Inbound Tourism",
    desc: "Innovative overland tours in Tanzania. National Park safaris, dinner cruises, corporate events, study trips & heritage tours.",
  },
  {
    icon: Plane, // Changed icon to Plane for Air Ticketing
    title: "AA Travel Air Ticketing",
    desc: "Book domestic and international flights with ease. Competitive fares, instant e-tickets, and 24/7 customer support for a smooth travel experience.",
  },
];

export default function DivisionsSection() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Specialized Expertise
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Our Divisions
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {divisions.map((div, i) => (
            <AnimatedSection key={div.title} delay={i * 0.15}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <div.icon className="h-6 w-6 text-secondary group-hover:text-secondary-foreground" />
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-semibold">{div.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{div.desc}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
