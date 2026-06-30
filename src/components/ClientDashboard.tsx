import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Cloud, CheckSquare, Sparkles, LogOut } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface ClientData {
  name: string;
  safariDate: string;
  destination: string;
}

const packingChecklist = [
  "Passport & visa documents",
  "Travel insurance papers",
  "Yellow fever certificate",
  "Neutral safari clothing",
  "Binoculars",
  "Camera & extra batteries",
  "Sunscreen SPF 50+",
  "Insect repellent",
  "Hat & sunglasses",
  "Comfortable walking shoes",
];

const tanzaniaFacts = [
  "Tanzania is home to Africa's highest mountain (Kilimanjaro) and deepest lake (Tanganyika).",
  "The Serengeti National Park hosts the world's largest annual animal migration.",
  "Zanzibar was once the world's largest clove producer.",
  "Tanzania has over 120 different ethnic groups, each with unique traditions.",
  "Olduvai Gorge in Tanzania is known as the 'Cradle of Mankind'.",
  "Lake Victoria, Africa's largest lake, is shared by Tanzania, Uganda, and Kenya.",
  "The Ngorongoro Crater is the world's largest intact volcanic caldera.",
];

export default function ClientDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [dailyFact, setDailyFact] = useState("");

  useEffect(() => {
    const loginState = localStorage.getItem("client_logged_in");
    setIsLoggedIn(loginState === "true");

    const saved = localStorage.getItem("packing_checklist");
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }

    const randomFact = tanzaniaFacts[Math.floor(Math.random() * tanzaniaFacts.length)];
    setDailyFact(randomFact);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("client_logged_in", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("client_logged_in");
    setIsLoggedIn(false);
  };

  const toggleCheck = (index: number) => {
    const updated = checkedItems.includes(index)
      ? checkedItems.filter((i) => i !== index)
      : [...checkedItems, index];
    setCheckedItems(updated);
    localStorage.setItem("packing_checklist", JSON.stringify(updated));
  };

  const clientData: ClientData = {
    name: "Safari Traveler",
    safariDate: "2025-07-15",
    destination: "Serengeti & Ngorongoro",
  };

  const calculateDaysUntil = () => {
    const today = new Date();
    const safari = new Date(clientData.safariDate);
    const diff = safari.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntil = calculateDaysUntil();

  if (!isLoggedIn) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Card className="mx-auto max-w-md">
              <CardContent className="p-8 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-heading text-xl font-bold">Client Dashboard</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Access your upcoming safari details, countdown timer, and packing checklist
                </p>
                <Button onClick={handleLogin} className="font-heading font-semibold">
                  Client Login (Demo)
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Welcome back, {clientData.name}!
              </h2>
              <p className="text-sm text-muted-foreground">Your safari adventure is coming soon</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedSection delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">Countdown</h3>
                </div>
                <div className="text-center">
                  <div className="mb-2 font-heading text-5xl font-bold text-primary">{daysUntil}</div>
                  <p className="text-sm text-muted-foreground">days until your safari</p>
                  <div className="mt-4 rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-medium">Departure Date</p>
                    <p className="text-sm font-semibold">{new Date(clientData.safariDate).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">{clientData.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">Weather Forecast</h3>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Serengeti</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">28°C</span>
                      <span className="text-sm">Sunny</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Perfect safari weather! Expect warm days and cool evenings. Pack layers.
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">Daily Fun Fact</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{dailyFact}</p>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="md:col-span-2 lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">Packing Checklist</h3>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {checkedItems.length}/{packingChecklist.length} packed
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {packingChecklist.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleCheck(i)}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                          checkedItems.includes(i)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {checkedItems.includes(i) && <CheckSquare className="h-3 w-3 text-white" />}
                      </div>
                      <span className={`text-sm ${checkedItems.includes(i) ? "line-through text-muted-foreground" : ""}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
