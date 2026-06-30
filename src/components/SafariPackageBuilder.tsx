import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain, Trees, Fish, Home, Plane, Save, Share2, DollarSign, ChevronDown, ChevronUp, FileDown, Clock, MapPin, Bed, Compass } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { convertPrice } from "@/components/CurrencyConverter";

interface ParkOption {
  id: string;
  name: string;
  icon: any;
  adultFee: number;
  childFee: number;
  vehicleFee: number;
  extraFee?: number;
  extraLabel?: string;
  desc: string;
  img: string;
}

interface AccommodationType {
  id: string;
  name: string;
  priceRange: string;
  pricePerDay: number;
  desc: string;
  img: string;
}

interface ActivityOption {
  id: string;
  name: string;
  priceRange: string;
  price: number;
  desc: string;
}

const parks: ParkOption[] = [
  { id: "serengeti", name: "Serengeti", icon: Trees, adultFee: 70, childFee: 20, vehicleFee: 45, desc: "Endless plains & Great Migration", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80" },
  { id: "ngorongoro", name: "Ngorongoro", icon: Mountain, adultFee: 70, childFee: 20, vehicleFee: 45, extraFee: 295, extraLabel: "Crater descent fee", desc: "World's largest volcanic caldera", img: "https://images.unsplash.com/photo-1612882299098-a4ef1a9bf338?w=400&q=80" },
  { id: "tarangire", name: "Tarangire", icon: Trees, adultFee: 60, childFee: 15, vehicleFee: 45, desc: "Ancient baobabs & elephant herds", img: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80" },
  { id: "manyara", name: "Lake Manyara", icon: Fish, adultFee: 60, childFee: 15, vehicleFee: 45, desc: "Tree-climbing lions & flamingos", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80" },
  { id: "selous", name: "Selous (Nyerere)", icon: Trees, adultFee: 50, childFee: 15, vehicleFee: 40, desc: "Africa's largest game reserve", img: "https://images.unsplash.com/photo-1535338454528-1b22dc446265?w=400&q=80" },
  { id: "arusha", name: "Arusha NP", icon: Mountain, adultFee: 55, childFee: 15, vehicleFee: 40, desc: "Mt. Meru & Momella Lakes", img: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=400&q=80" },
  { id: "ruaha", name: "Ruaha", icon: Trees, adultFee: 50, childFee: 15, vehicleFee: 40, desc: "Remote wilderness, huge elephant herds", img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80" },
  { id: "kilimanjaro", name: "Kilimanjaro", icon: Mountain, adultFee: 70, childFee: 20, vehicleFee: 0, extraFee: 70, extraLabel: "Camping + rescue fee", desc: "Roof of Africa — 5,895m", img: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=400&q=80" },
];

const accommodations: AccommodationType[] = [
  { id: "luxury", name: "Luxury Lodges", priceRange: "$800–2,500/night", pricePerDay: 1200, desc: "5-star lodges with all amenities", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
  { id: "midrange", name: "Mid-Range Lodges", priceRange: "$300–600/night", pricePerDay: 450, desc: "Comfortable lodges & tented camps", img: "https://images.unsplash.com/photo-1499793983394-e58fc2abf203?w=400&q=80" },
  { id: "budget", name: "Budget Camping", priceRange: "$30–150/night", pricePerDay: 90, desc: "Basic camping & budget lodges", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80" },
];

const activities: ActivityOption[] = [
  { id: "balloon", name: "Balloon Safari", priceRange: "$550–650", price: 600, desc: "Float over the Serengeti at dawn" },
  { id: "walking", name: "Walking Safari", priceRange: "$50–100", price: 75, desc: "Guided bushwalk with armed ranger" },
  { id: "night", name: "Night Game Drive", priceRange: "$100–150", price: 125, desc: "Spot nocturnal predators" },
  { id: "cultural", name: "Cultural Visit", priceRange: "$30–50", price: 40, desc: "Maasai village experience" },
  { id: "dinner", name: "Bush Dinner", priceRange: "$80–150", price: 115, desc: "Dine under the African stars" },
  { id: "sundowner", name: "Sundowner", priceRange: "$40–60", price: 50, desc: "Cocktails at sunset viewpoint" },
];

const quickDays = [3, 5, 7, 10, 14];

export default function SafariPackageBuilder() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [days, setDays] = useState([7]);
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState("midrange");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("duration");
  const { toast } = useToast();

  const calculatePrice = useCallback(() => {
    // Park fees (per person per day at each park)
    const parkFees = selectedParks.reduce((sum, parkId) => {
      const park = parks.find((p) => p.id === parkId);
      if (!park) return sum;
      return sum + park.adultFee + park.vehicleFee + (park.extraFee || 0);
    }, 0);

    // Accommodation
    const accPrice = days[0] * (accommodations.find((a) => a.id === accommodation)?.pricePerDay || 0);

    // Activities
    const actPrice = selectedActivities.reduce((sum, actId) => {
      const activity = activities.find((a) => a.id === actId);
      return sum + (activity?.price || 0);
    }, 0);

    // Guide fee per day
    const guideFee = days[0] * 50;

    setTotalPrice(parkFees + accPrice + actPrice + guideFee);
  }, [days, selectedParks, accommodation, selectedActivities]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("safari_itinerary");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.days) setDays([data.days]);
        if (data.parks) setSelectedParks(data.parks);
        if (data.accommodation) setAccommodation(data.accommodation);
        if (data.activities) setSelectedActivities(data.activities);
      } catch {}
    }
  }, []);

  const handleParkToggle = (parkId: string) => {
    setSelectedParks((prev) =>
      prev.includes(parkId) ? prev.filter((id) => id !== parkId) : [...prev, parkId]
    );
  };

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const handleSave = () => {
    const itinerary = { days: days[0], parks: selectedParks, accommodation, activities: selectedActivities, totalPrice, savedAt: new Date().toISOString() };
    localStorage.setItem("safari_itinerary", JSON.stringify(itinerary));
    toast({ title: "Itinerary Saved! ✅", description: "Your safari package has been saved." });
  };

  const handleShare = () => {
    const parkNames = selectedParks.map((id) => parks.find((p) => p.id === id)?.name).join(", ");
    const accommodationName = accommodations.find((a) => a.id === accommodation)?.name;
    const activityNames = selectedActivities.map((id) => activities.find((a) => a.id === id)?.name).join(", ");
    const message = `🦁 My Custom Tanzania Safari!\n\nDuration: ${days[0]} days\nParks: ${parkNames || "None selected"}\nAccommodation: ${accommodationName}\nActivities: ${activityNames || "Standard game drives"}\nEstimated Total: $${totalPrice.toLocaleString()}\n\nPlan yours at www.aatraveltz.com`;
    window.open(`https://wa.me/255787447553?text=${encodeURIComponent(message)}`, "_blank");
  };

  const parkFeeBreakdown = selectedParks.reduce((sum, parkId) => {
    const park = parks.find((p) => p.id === parkId);
    return sum + (park ? park.adultFee + park.vehicleFee + (park.extraFee || 0) : 0);
  }, 0);

  const accTotal = days[0] * (accommodations.find((a) => a.id === accommodation)?.pricePerDay || 0);
  const actTotal = selectedActivities.reduce((sum, id) => sum + (activities.find((a) => a.id === id)?.price || 0), 0);
  const guideTotal = days[0] * 50;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">Interactive Planner</p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Build Your Safari</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Real Tanzania park fees & pricing — customize and see costs instantly</p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 font-heading"
            >
              {isExpanded ? "Collapse Planner" : "Open Safari Planner"}
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </AnimatedSection>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mx-auto mt-8 max-w-6xl">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="duration" className="gap-1 text-xs sm:text-sm"><Clock className="h-3 w-3 sm:h-4 sm:w-4" /><span className="hidden sm:inline">Duration</span><span className="sm:hidden">1</span></TabsTrigger>
                        <TabsTrigger value="parks" className="gap-1 text-xs sm:text-sm"><MapPin className="h-3 w-3 sm:h-4 sm:w-4" /><span className="hidden sm:inline">Parks</span><span className="sm:hidden">2</span></TabsTrigger>
                        <TabsTrigger value="accommodation" className="gap-1 text-xs sm:text-sm"><Bed className="h-3 w-3 sm:h-4 sm:w-4" /><span className="hidden sm:inline">Stay</span><span className="sm:hidden">3</span></TabsTrigger>
                        <TabsTrigger value="activities" className="gap-1 text-xs sm:text-sm"><Compass className="h-3 w-3 sm:h-4 sm:w-4" /><span className="hidden sm:inline">Activities</span><span className="sm:hidden">4</span></TabsTrigger>
                      </TabsList>

                      <TabsContent value="duration">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-heading text-lg font-semibold mb-4">Select Duration</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {quickDays.map((d) => (
                                <Button key={d} variant={days[0] === d ? "default" : "outline"} size="sm" onClick={() => setDays([d])} className="font-heading min-w-[60px]">
                                  {d} days
                                </Button>
                              ))}
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Or use slider</span>
                                <span className="font-heading text-2xl font-bold text-primary">{days[0]} days</span>
                              </div>
                              <Slider value={days} onValueChange={setDays} min={3} max={14} step={1} />
                              <div className="flex justify-between text-xs text-muted-foreground"><span>3 days</span><span>14 days</span></div>
                            </div>
                            <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                              <strong>Guide fee:</strong> $50/day × {days[0]} days = ${guideTotal}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="parks">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-heading text-lg font-semibold mb-4">Select Parks — Real Entry Fees</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {parks.map((park) => (
                                <div
                                  key={park.id}
                                  className={`flex items-start gap-3 rounded-xl border-2 p-3 transition-all cursor-pointer ${
                                    selectedParks.includes(park.id) ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/50"
                                  }`}
                                  onClick={() => handleParkToggle(park.id)}
                                >
                                  <Checkbox checked={selectedParks.includes(park.id)} onCheckedChange={() => handleParkToggle(park.id)} className="mt-1" />
                                  <div className="hidden sm:block h-16 w-16 rounded-lg overflow-hidden shrink-0">
                                    <img src={park.img} alt={park.name} className="h-full w-full object-cover" loading="lazy" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold">{park.name}</p>
                                    <p className="text-xs text-muted-foreground">{park.desc}</p>
                                    <div className="mt-1 text-[10px] text-primary font-medium">
                                      Adult: ${park.adultFee} | Vehicle: ${park.vehicleFee}
                                      {park.extraFee && <> | {park.extraLabel}: ${park.extraFee}</>}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="accommodation">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-heading text-lg font-semibold mb-4">Choose Accommodation</h3>
                            <RadioGroup value={accommodation} onValueChange={setAccommodation} className="space-y-3">
                              {accommodations.map((acc) => (
                                <div
                                  key={acc.id}
                                  className={`flex items-start gap-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                                    accommodation === acc.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/50"
                                  }`}
                                  onClick={() => setAccommodation(acc.id)}
                                >
                                  <RadioGroupItem value={acc.id} id={acc.id} className="mt-1" />
                                  <div className="hidden sm:block h-16 w-16 rounded-lg overflow-hidden shrink-0">
                                    <img src={acc.img} alt={acc.name} className="h-full w-full object-cover" loading="lazy" />
                                  </div>
                                  <div className="flex-1">
                                    <Label htmlFor={acc.id} className="font-semibold cursor-pointer">{acc.name}</Label>
                                    <p className="text-xs text-muted-foreground">{acc.desc}</p>
                                    <p className="text-xs text-primary font-medium mt-1">{acc.priceRange}</p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="activities">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-heading text-lg font-semibold mb-4">Add Activities</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {activities.map((activity) => (
                                <div
                                  key={activity.id}
                                  className={`flex items-start gap-3 rounded-xl border-2 p-3 transition-all cursor-pointer ${
                                    selectedActivities.includes(activity.id) ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/50"
                                  }`}
                                  onClick={() => handleActivityToggle(activity.id)}
                                >
                                  <Checkbox checked={selectedActivities.includes(activity.id)} onCheckedChange={() => handleActivityToggle(activity.id)} className="mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold">{activity.name}</p>
                                    <p className="text-xs text-muted-foreground">{activity.desc}</p>
                                    <p className="text-xs text-primary font-medium mt-1">{activity.priceRange}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Price Summary */}
                  <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <h3 className="font-heading text-lg font-semibold">Price Breakdown</h3>
                        </div>

                        <div className="space-y-3 border-b pb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Park Fees ({selectedParks.length} parks)</span>
                            <span className="font-medium">${parkFeeBreakdown.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Accommodation ({days[0]} nights)</span>
                            <span className="font-medium">${accTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Activities ({selectedActivities.length})</span>
                            <span className="font-medium">${actTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Guide ({days[0]} days)</span>
                            <span className="font-medium">${guideTotal.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-heading text-lg font-bold">Estimated Total</span>
                          <span className="font-heading text-3xl font-bold text-primary">${totalPrice.toLocaleString()}</span>
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground">≈ {convertPrice(totalPrice)}</p>

                        <div className="mt-6 space-y-2">
                          <Button onClick={handleSave} className="w-full gap-2 font-heading" variant="outline">
                            <Save className="h-4 w-4" /> Save Itinerary
                          </Button>
                          <Button onClick={handleShare} className="w-full gap-2 font-heading">
                            <Share2 className="h-4 w-4" /> Share via WhatsApp
                          </Button>
                        </div>

                        <p className="mt-4 text-center text-[10px] text-muted-foreground">
                          Prices based on 2024/25 TANAPA & NCAA fees. Final cost may vary by season.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
