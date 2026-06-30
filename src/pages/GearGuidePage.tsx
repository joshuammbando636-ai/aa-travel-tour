import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

interface ShopLink {
  label: string;
  url: string;
}

interface GearItem {
  name: string;
  desc: string;
  links: ShopLink[];
}

const categories: { title: string; items: GearItem[] }[] = [
  {
    title: "Safari Essentials",
    items: [
      { name: "Binoculars (10x42)", desc: "Essential for spotting wildlife from a distance. Look for waterproof models.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=safari+binoculars+10x42" },
        { label: "REI", url: "https://www.rei.com/search?q=binoculars+10x42" },
        { label: "Decathlon", url: "https://www.decathlon.com/search?Ntt=binoculars" },
      ]},
      { name: "Wide-Brim Safari Hat", desc: "Sun protection is crucial on the open plains. UPF 50+ recommended.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=safari+hat+upf+50" },
        { label: "REI", url: "https://www.rei.com/search?q=sun+hat+upf" },
      ]},
      { name: "Neutral Clothing Set", desc: "Khaki, olive, and beige long sleeves. Avoid bright colors on safari.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=safari+clothing+neutral" },
        { label: "Decathlon", url: "https://www.decathlon.com/search?Ntt=safari+clothing" },
        { label: "Columbia", url: "https://www.columbia.com/search?q=safari" },
      ]},
      { name: "Insect Repellent (DEET)", desc: "30-50% DEET or Picaridin for mosquito protection.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=insect+repellent+deet+safari" },
        { label: "iHerb", url: "https://www.iherb.com/search?kw=insect+repellent+deet" },
      ]},
    ],
  },
  {
    title: "Photography Gear",
    items: [
      { name: "Camera with Zoom Lens", desc: "200-600mm zoom for wildlife. Mirrorless cameras are lighter for travel.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=wildlife+camera+zoom+lens" },
        { label: "B&H Photo", url: "https://www.bhphotovideo.com/c/search?q=wildlife+zoom+lens" },
        { label: "Adorama", url: "https://www.adorama.com/l/?searchinfo=wildlife+zoom+lens" },
      ]},
      { name: "Beanbag Camera Rest", desc: "Stabilize your camera on the vehicle window frame. Much better than a tripod.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=beanbag+camera+rest+safari" },
        { label: "B&H Photo", url: "https://www.bhphotovideo.com/c/search?q=beanbag+camera+rest" },
      ]},
      { name: "Extra Memory Cards", desc: "You'll take thousands of photos. Bring at least 128GB total.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=sd+card+128gb" },
        { label: "B&H Photo", url: "https://www.bhphotovideo.com/c/search?q=sd+card+128gb" },
      ]},
      { name: "Portable Power Bank", desc: "Keep devices charged in the bush. 20,000mAh recommended.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=power+bank+20000mah" },
        { label: "Best Buy", url: "https://www.bestbuy.com/site/searchpage.jsp?st=power+bank+20000mah" },
      ]},
    ],
  },
  {
    title: "Kilimanjaro Climbing",
    items: [
      { name: "Hiking Boots (Broken In)", desc: "Waterproof, ankle-supporting boots. Break them in weeks before the climb.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=hiking+boots+waterproof" },
        { label: "REI", url: "https://www.rei.com/search?q=hiking+boots+waterproof" },
        { label: "Merrell", url: "https://www.merrell.com/US/en/hiking-boots/" },
      ]},
      { name: "Down Jacket (-20°C)", desc: "Summit night temperatures drop below freezing. Layer system is key.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=down+jacket+mountaineering" },
        { label: "REI", url: "https://www.rei.com/search?q=down+jacket" },
        { label: "The North Face", url: "https://www.thenorthface.com/en-us/mens/mens-jackets-and-vests/mens-down-jackets" },
      ]},
      { name: "Headlamp (Rechargeable)", desc: "For summit night starting at midnight. Bring extra batteries.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=headlamp+rechargeable+hiking" },
        { label: "REI", url: "https://www.rei.com/search?q=headlamp+rechargeable" },
        { label: "Petzl", url: "https://www.petzl.com/US/en/Sport/Headlamps" },
      ]},
      { name: "Trekking Poles", desc: "Reduce knee strain on descents. Collapsible ones pack easily.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=trekking+poles+collapsible" },
        { label: "REI", url: "https://www.rei.com/search?q=trekking+poles" },
        { label: "Decathlon", url: "https://www.decathlon.com/search?Ntt=trekking+poles" },
      ]},
    ],
  },
  {
    title: "Beach & Zanzibar",
    items: [
      { name: "Reef-Safe Sunscreen", desc: "Protect coral reefs while protecting your skin. SPF 50+.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=reef+safe+sunscreen+spf+50" },
        { label: "iHerb", url: "https://www.iherb.com/search?kw=reef+safe+sunscreen" },
      ]},
      { name: "Snorkel Set", desc: "While often provided, having your own ensures a perfect fit.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=snorkel+set+travel" },
        { label: "Decathlon", url: "https://www.decathlon.com/search?Ntt=snorkel+set" },
      ]},
      { name: "Dry Bag", desc: "Keep electronics safe on boat trips and water activities.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=dry+bag+waterproof" },
        { label: "REI", url: "https://www.rei.com/search?q=dry+bag" },
      ]},
      { name: "Lightweight Cover-Up", desc: "Zanzibar is a Muslim island — respectful dress is appreciated in town.", links: [
        { label: "Amazon", url: "https://www.amazon.com/s?k=beach+cover+up+lightweight" },
      ]},
    ],
  },
];

export default function GearGuidePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Safari Gear Guide</h1>
          <p className="mt-2 text-lg text-white/80">Everything you need for your Tanzania adventure</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {categories.map((cat, ci) => (
          <AnimatedSection key={cat.title} delay={ci * 0.1}>
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6">{cat.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((item) => (
                  <Card key={item.name} className="group transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="h-4 w-4 text-primary shrink-0" />
                        <h3 className="font-heading text-sm font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground flex-1 mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.links.map((link) => (
                          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-1 font-heading text-[11px] h-7 px-2">
                              <ExternalLink className="h-2.5 w-2.5" /> {link.label}
                            </Button>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </main>
      <Footer />
    </div>
  );
}
