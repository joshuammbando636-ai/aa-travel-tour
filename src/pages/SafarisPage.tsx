import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Clock, Plane, Hotel, Utensils, Bus, Camera, Trophy, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const inclusionIcons = {
  "Hotel Stay": <Hotel className="h-4 w-4" />,
  "Breakfast + Dinner": <Utensils className="h-4 w-4" />,
  "Airport Transfers": <Plane className="h-4 w-4" />,
  "Sightseeings": <Camera className="h-4 w-4" />,
  "Tour Manager service": <Users className="h-4 w-4" />,
  "6N China Accommodation at 4-star Hotel": <Hotel className="h-4 w-4" />,
  "Guangzhou city tour": <Camera className="h-4 w-4" />,
  "Shuttle service To/from Canton Fair": <Bus className="h-4 w-4" />,
  "Return airport transfers": <Plane className="h-4 w-4" />,
  "3N Johannesburg accommodation at Peermont D'Oreale Grande or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "3N Sun City accommodation at Cascades Hotel or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "2N Pilanesberg accommodation at Ivory Tree Lodge or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "Complimentary access to Sun City Resort": <Star className="h-4 w-4" />,
  "Entry into the Valley of Waves": <Star className="h-4 w-4" />,
  "4N Cape Town accommodation at Hotel Sky (4-star) or similar on BB basis": <Hotel className="h-4 w-4" />,
  "2N Aquila Game Reserve accommodation at 4-star hotel or similar on FB basis": <Hotel className="h-4 w-4" />,
  "Afternoon game drive in an open 4x4 safari vehicle": <Camera className="h-4 w-4" />,
  "Table Mountain & City Tour": <Camera className="h-4 w-4" />,
  "Winelands Tour": <Camera className="h-4 w-4" />,
  "Cape Peninsula Tour": <Camera className="h-4 w-4" />,
  "3N Kruger Accommodation at Kruger Gate lodge or similar on HB basis": <Hotel className="h-4 w-4" />,
  "Afternoon safari in Kruger on day 1": <Camera className="h-4 w-4" />,
  "Full-day scheduled safari in Kruger on days 2 & 3": <Camera className="h-4 w-4" />,
  "Morning safari in Kruger on day 4": <Camera className="h-4 w-4" />,
  "Luxury air-conditioned vehicle for transfers": <Bus className="h-4 w-4" />,
  "Open 4 x 4 safari vehicle for game activities in Kruger": <Bus className="h-4 w-4" />,
  "Services of an English-speaking driver only for return transfers": <Users className="h-4 w-4" />,
  "Services of an English-speaking game ranger for game activities in Kruger": <Users className="h-4 w-4" />,
  "Full-day safari times 05:30am-16:00pm (Apr-Sep) and 05:00am-15:30pm (Oct-Mar)": <Clock className="h-4 w-4" />,
  "Morning Safari times 05:30am-12:00pm (Apr-Sep) and 05:00am-11:30am (Oct-Mar)": <Clock className="h-4 w-4" />,
  "Afternoon safari times 13:00pm-17:30pm (May-Jul) and 14:00pm-18:00pm (Aug-Apr)": <Clock className="h-4 w-4" />,
  "5N accommodation – Bed & Breakfast": <Hotel className="h-4 w-4" />,
  "Half Day Dubai City Tour (Trio)": <Camera className="h-4 w-4" />,
  "Marina Dhow Cruise with BBQ Dinner (Trio)": <Plane className="h-4 w-4" />,
  "Desert Safari with BBQ Dinner (Trio)": <Camera className="h-4 w-4" />,
  "Dubai Frame – SIC Transfers": <Bus className="h-4 w-4" />,
  "Burj Khalifa 124th Floor visit (Non-Prime Hours)": <Camera className="h-4 w-4" />,
  "Dubai Aquarium & Underwater Zoo": <Camera className="h-4 w-4" />,
  "Combo Ticket – SIC": <Ticket className="h-4 w-4" />,
  "Miracle Garden entry + Global Village – SIC": <Camera className="h-4 w-4" />,
  "All tours and transfers": <Bus className="h-4 w-4" />,
  "1N Johannesburg accommodation at Metcourt hotel or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "3N Sun City accommodation at Cabanas or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "Complimentary access to Peermont resort": <Star className="h-4 w-4" />,
  "Complimentary access to Valley of Waves waterpark": <Star className="h-4 w-4" />,
  "Entrance fees for Lesedi cultural village": <Camera className="h-4 w-4" />,
  "Services of an English-speaking guide throughout the tour": <Users className="h-4 w-4" />,
  "Luxury air-conditioned vehicle for 20 pax. This will include: 1 x local tour guide FOC + 1 Tour Manager FOC": <Bus className="h-4 w-4" />,
  "1N Johannesburg accommodation at Mondior Concorde or similar (BB basis)": <Hotel className="h-4 w-4" />,
  "Complimentary access to the Valley of Waves waterpark": <Star className="h-4 w-4" />
};

// Default fallback packages (maintaining exact image paths)
const defaultPackages = [
  {
    id: 1,
    region: "Europe",
    title: "EMBARK ON THE SCENIC JOURNEY OF EUROPE",
    description: "Experience the romance of France, the charm of Belgium, the canals of Netherlands, the history of Germany, the Alps of Switzerland, the principality of Liechtenstein, the culture of Austria, and the passion of Italy on this comprehensive European tour.",
    image: "images/logo/europe.jpeg",
    price: 3199,
    dates: ["11TH MAY 2026", "15TH JUN 2026", "12TH JUL 2026", "16TH AUG 2026"],
    duration: "Multi-Country Tour",
    countries: ["France", "Belgium", "Netherlands", "Germany", "Switzerland", "Liechtenstein", "Austria", "Italy"],
    inclusions: ["Hotel Stay", "Breakfast + Dinner", "Airport Transfers", "Sightseeings", "Tour Manager service"]
  },
  {
    id: 2,
    region: "China",
    title: "CANTON FAIR 2026 CHINA",
    description: "Perfect for business travelers! Visit the world-renowned Canton Fair with comfortable 4-star accommodation and seamless shuttle service to and from the fair location. Includes Guangzhou city tour and return airport transfers.",
    image: "images/logo/china.jpeg",
    price: 376,
    dates: ["Phase 1: 14 Apr To 20 Apr 2026", "Phase 2: 22 Apr To 28 Apr 2026", "Phase 3: 30 Apr To 06 May 2026"],
    duration: "6 Nights/7 Days",
    packageId: "SAT2428",
    inclusions: ["6N China Accommodation at 4-star Hotel", "Guangzhou city tour", "Shuttle service To/from Canton Fair", "Return airport transfers"],
    minPax: 10,
    note: "Package rates quoted are subject to fluctuations in the rate of exchange. All rooms, rates and services are subject to availability at the time of confirmation."
  },
  {
    id: 3,
    region: "South Africa",
    title: "CELEBRATE EASTER AT THE MOST ICONIC DESTINATION - SOUTH AFRICA",
    description: "Celebrate Easter at the most iconic destination with a perfect blend of luxury and adventure.",
    image: "images/logo/new packages/k.jpeg",
    price: 1392,
    dates: ["1st April 2026 to 30th April 2026"],
    duration: "6 Nights/7 Days",
    packageId: "SAT2368",
    locations: ["Johannesburg", "Sun City", "Pilanesberg"],
    inclusions: [
      "3N Johannesburg accommodation at Peermont D'Oreale Grande or similar (BB basis)",
      "3N Sun City accommodation at Cascades Hotel or similar (BB basis)",
      "2N Pilanesberg accommodation at Ivory Tree Lodge or similar (BB basis)",
      "Complimentary access to Sun City Resort",
      "Entry into the Valley of Waves"
    ],
    validity: "1st April 2026 to 30th April 2026"
  },
  {
    id: 4,
    region: "South Africa",
    title: "EXPLORE AN IMMERSIVE SAFARI EXPERIENCE - SOUTH AFRICA",
    description: "Experience the ultimate safari adventure with game drives, winelands tours, and breathtaking views.",
    image: "images/logo/new packages/s.jpeg",
    price: 656,
    dates: ["1st April 2026 to 30th April 2026"],
    duration: "6 Nights/7 Days",
    packageId: "SAT2295",
    locations: ["Cape Town", "Aquila Game Reserve"],
    inclusions: [
      "4N Cape Town accommodation at Hotel Sky (4-star) or similar on BB basis",
      "2N Aquila Game Reserve accommodation at 4-star hotel or similar on FB basis",
      "Afternoon game drive in an open 4x4 safari vehicle",
      "Table Mountain & City Tour",
      "Winelands Tour",
      "Cape Peninsula Tour"
    ],
    note: "Exchange rate fluctuations may affect the quoted package rates. At the time of confirmation, availability affects all rooms, rates, and services. Rates do not apply to events, trade shows, long weekends, festivals, or blackout dates.",
    validity: "1st April 2026 to 30th April 2026"
  },
  {
    id: 5,
    region: "South Africa",
    title: "CELEBRATE EASTER WITH AN UNFORGETTABLE WILDLIFE ADVENTURE",
    description: "Experience thrilling game drives and close encounters with Africa's magnificent wildlife in Kruger National Park.",
    image: "images/logo/new packages/WhatsApp Image 2026-02-20 at 10.22.07.jpeg",
    price: 1048,
    dates: ["1st April 2026 to 30th April 2026"],
    duration: "3 Nights/4 Days",
    locations: ["Kruger National Park"],
    inclusions: [
      "3N Kruger Accommodation at Kruger Gate lodge or similar on HB basis",
      "Afternoon safari in Kruger on day 1",
      "Full-day scheduled safari in Kruger on days 2 & 3",
      "Morning safari in Kruger on day 4",
      "Luxury air-conditioned vehicle for transfers",
      "Open 4 x 4 safari vehicle for game activities in Kruger",
      "Services of an English-speaking driver only for return transfers",
      "Services of an English-speaking game ranger for game activities in Kruger",
      "Full-day safari times 05:30am-16:00pm (Apr-Sep) and 05:00am-15:30pm (Oct-Mar)",
      "Morning Safari times 05:30am-12:00pm (Apr-Sep) and 05:00am-11:30am (Oct-Mar)",
      "Afternoon safari times 13:00pm-17:30pm (May-Jul) and 14:00pm-18:00pm (Aug-Apr)"
    ],
    note: "The package rates quoted are subject to fluctuations in the rate of exchange. All rooms, rates and services are subject to availability at the time of confirmation.",
    validity: "1st April 2026 to 30th April 2026"
  },
  {
    id: 6,
    region: "Dubai",
    title: "EXPERIENCE A PREMIUM EID AL FITR CELEBRATION IN DUBAI",
    description: "Celebrate Eid in style with luxury accommodations, desert safaris, and iconic Dubai attractions.",
    image: "images/logo/new packages/d.jpeg",
    price: 416,
    dates: ["15th March 2026 to 25th March 2026"],
    duration: "5 Nights/6 Days",
    packageId: "SAT2365",
    locations: ["Dubai"],
    inclusions: [
      "5N accommodation – Bed & Breakfast",
      "Half Day Dubai City Tour (Trio)",
      "Marina Dhow Cruise with BBQ Dinner (Trio)",
      "Desert Safari with BBQ Dinner (Trio)",
      "Dubai Frame – SIC Transfers",
      "Burj Khalifa 124th Floor visit (Non-Prime Hours)",
      "Dubai Aquarium & Underwater Zoo",
      "Combo Ticket – SIC",
      "Miracle Garden entry + Global Village – SIC",
      "Return Airport transfers – Private",
      "All tours and transfers"
    ],
    priceNote: "Per person (Twin/double sharing basis)",
    validity: "15th March 2026 to 25th March 2026"
  },
  {
    id: 7,
    region: "South Africa",
    title: "BOOK YOUR EASTER GETAWAY TO THE RAINBOW NATION",
    description: "Experience the beauty of South Africa with visits to cultural villages, Sun City, and the Valley of Waves.",
    image: "images/logo/new packages/i.jpeg",
    price: 570,
    dates: ["1st April 2026 to 30th April 2026"],
    duration: "4 Nights/5 Days",
    packageId: "SAT2367",
    locations: ["Johannesburg", "Sun City"],
    inclusions: [
      "1N Johannesburg accommodation at Metcourt hotel or similar (BB basis)",
      "3N Sun City accommodation at Cabanas or similar (BB basis)",
      "Complimentary access to Peermont resort",
      "Complimentary access to Sun City Resort",
      "Complimentary access to Valley of Waves waterpark",
      "Entrance fees for Lesedi cultural village",
      "Services of an English-speaking guide throughout the tour",
      "Luxury air-conditioned vehicle for 20 pax. This will include: 1 x local tour guide FOC + 1 Tour Manager FOC"
    ],
    validity: "1st April 2026 to 30th April 2026"
  },
  {
    id: 8,
    region: "South Africa",
    title: "BOOK AN EASTER ESCAPE TO SUN CITY",
    description: "Enjoy a relaxing Easter getaway with complimentary access to Sun City's world-class amenities.",
    image: "images/logo/new packages/j.jpeg",
    price: 651,
    dates: ["1st April 2026 to 30th April 2026"],
    duration: "4 Nights/5 Days",
    packageId: "SAT2370",
    locations: ["Johannesburg", "Sun City"],
    inclusions: [
      "1N Johannesburg accommodation at Mondior Concorde or similar (BB basis)",
      "3N Sun City accommodation at Cascades Hotel or similar (BB basis)",
      "Complimentary access to Peermont resort",
      "Complimentary access to Sun City Resort",
      "Complimentary access to the Valley of Waves waterpark"
    ],
    note: "The package rates quoted are subject to fluctuations in the rate of exchange. All rooms, rates and services are subject to availability.",
    validity: "1st April 2026 to 30th April 2026"
  }
];

export default function PackagesPage() {
  const { t, i18n } = useTranslation('packages');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get packages with fallback - maintaining all image paths from defaultPackages
  let packages = defaultPackages;

  if (mounted) {
    try {
      const translatedPackages = t('packages', { returnObjects: true });
      packages = Array.isArray(translatedPackages) ? translatedPackages.map((pkg: any, index: number) => ({
        ...pkg,
        image: defaultPackages[index]?.image || pkg.image,
        price: defaultPackages[index]?.price || pkg.price,
        dates: defaultPackages[index]?.dates || pkg.dates,
        packageId: defaultPackages[index]?.packageId || pkg.packageId,
        minPax: defaultPackages[index]?.minPax || pkg.minPax,
        validity: defaultPackages[index]?.validity || pkg.validity,
        priceNote: defaultPackages[index]?.priceNote || pkg.priceNote
      })) : defaultPackages;
    } catch (error) {
      console.log("Translation not ready yet, using defaults");
      packages = defaultPackages;
    }
  }

  // Why choose items with translations
  let whyChoose = [
    { icon: Trophy, title: "Best Price Guarantee", desc: "Unbeatable prices on all packages" },
    { icon: Users, title: "Expert Guides", desc: "Local experts with deep knowledge" },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance" },
    { icon: Plane, title: "Flexible Booking", desc: "Free cancellation & date changes" }
  ];

  if (mounted) {
    try {
      const translatedWhyChoose = t('whyChoose', { returnObjects: true });
      if (Array.isArray(translatedWhyChoose)) {
        whyChoose = whyChoose.map((item, index) => ({
          ...item,
          title: translatedWhyChoose[index]?.title || item.title,
          desc: translatedWhyChoose[index]?.desc || item.desc
        }));
      }
    } catch (error) {
      console.log("Why choose translation not ready yet");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('images/acacia.jpg')",
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4">
          <AnimatedSection className="max-w-2xl">
            <h1 className="font-heading text-5xl font-bold text-white md:text-7xl mb-4">
              {mounted ? t('hero.title') : "Discover Your"}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {mounted ? t('hero.highlight') : "Next Adventure"}
              </span>
            </h1>
          </AnimatedSection>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Featured Deals */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {mounted ? t('sections.featured') : "Special Eid & Easter Deals"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {mounted ? t('hero.subtitle') : "Curated travel experiences for the upcoming holiday season. Book now and save big!"}
          </p>
        </AnimatedSection>

        {/* Package Cards */}
        <div className="space-y-12">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.id} delay={index * 0.1}>
              <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <div className="grid md:grid-cols-3">
                  {/* Image Section */}
                  <div className="relative md:col-span-1 overflow-hidden h-64 md:h-auto">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Price Tag - Top Right Corner */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg text-center">
                        <div className="text-2xl font-bold">${pkg.price}</div>
                        <div className="text-xs opacity-90">{mounted ? t('labels.perPerson') : "per person*"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{pkg.region}</span>
                        </div>
                        <h3 className="font-heading text-2xl font-bold mb-2 text-gray-900 dark:text-white">{pkg.title}</h3>
                        {pkg.packageId && (
                          <span className="text-xs text-gray-500 dark:text-gray-500">{mounted ? t('labels.packageId') : "Package ID"}: {pkg.packageId}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">{pkg.description}</p>

                    {/* Countries/Locations */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(pkg.countries || pkg.locations)?.map((item, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    {/* Key Info */}
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">{mounted ? t('labels.duration') : "Duration"}</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{pkg.duration}</div>
                        </div>
                      </div>
                      {pkg.validity && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-500" />
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-500">{mounted ? t('labels.validity') : "Validity"}</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{pkg.validity}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inclusions */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{mounted ? t('labels.inclusions') : "Inclusions"}:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            {inclusionIcons[inc] || <Star className="h-4 w-4 text-green-500" />}
                            <span className="line-clamp-2">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Available Dates */}
                    {pkg.dates && (
                      <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{mounted ? t('labels.availableDates') : "Available Dates"}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(pkg.dates) ? pkg.dates.map((date, i) => (
                            <Badge key={i} className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-0">
                              {date}
                            </Badge>
                          )) : (
                            <Badge className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-0">
                              {pkg.dates}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Special Notes */}
                    {pkg.note && (
                      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">{pkg.note}</p>
                      </div>
                    )}

                    {/* Send Inquiry Button */}
                    <div className="flex justify-end">
                      <Link to="/contact">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          {mounted ? t('labels.sendInquiry') : "Send Inquiry"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Why Choose Us */}
        <AnimatedSection className="mt-20 text-center">
          <h2 className="font-heading text-3xl font-bold mb-12 text-gray-900 dark:text-white">
            {mounted ? t('sections.whyChoose') : "Why Travel With Us"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-4 bg-orange-100 dark:bg-orange-900 rounded-full text-orange-600 dark:text-orange-300 mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </main>
      
      <Footer />
    </div>
  );
}