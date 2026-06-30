import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, MapPin, Clock, Compass, DollarSign, Send, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Choose Destination",
    icon: MapPin,
    options: [
      { label: "Serengeti National Park", img: "images/golden.webp", desc: "Endless plains & the Great Migration" },
      { label: "Ngorongoro Crater", img: "images/crater.avif", desc: "World's largest volcanic caldera" },
      { label: "Mount Kilimanjaro", img: "images/mountkili.avif", desc: "Africa's highest peak at 5,895m" },
      { label: "Zanzibar", img: "images/zenj.avif", desc: "Tropical paradise beaches & spice island" },
      { label: "Tarangire", img: "images/tarangire.avif", desc: "Ancient baobabs & elephant herds" },
      { label: "Lake Manyara", img: "images/lake.avif", desc: "Bufallo & flamingos" },
    ],
  },
  {
    title: "Select Duration",
    icon: Clock,
    options: [
      { label: "3 Days", img: "images/short.webp", desc: "Quick safari getaway — perfect for weekends" },
      { label: "5 Days", img: "https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_1280.jpg", desc: "Classic experience — Serengeti + Ngorongoro" },
      { label: "7 Days", img: "images/northern.avif", desc: "Comprehensive tour — northern circuit" },
      { label: "10+ Days", img: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg", desc: "Ultimate adventure — safari + Zanzibar" },
    ],
  },
  {
    title: "Pick Activities",
    icon: Compass,
    options: [
      { label: "Game Drives", img: "images/4wheel.avif", desc: "Classic safari in 4x4 vehicles" },
      { label: "Walking Safari", img: "images/walki.avif", desc: "Up-close with nature on foot" },
      { label: "Hot Air Balloon", img: "images/hotba.webp", desc: "Aerial views of the Serengeti at dawn" },
      { label: "Cultural Visit", img: "images/masaa.avif", desc: "Meet Maasai communities & traditions" },
    ],
  },
  {
    title: "Budget Range",
    icon: DollarSign,
    options: [
      { label: "Budget ($1,000–2,000)", img: "images/camp.avif", desc: "Camping & basic lodges" },
      { label: "Mid-Range ($2,000–4,000)", img: "images/midrange.avif", desc: "Comfortable lodges & tented camps" },
      { label: "Luxury ($4,000–8,000)", img: "images/private.avif", desc: "Premium lodges & private camps" },
      { label: "Ultra-Luxury ($8,000+)", img: "images/ultra.avif", desc: "Private & exclusive experiences" },
    ],
  },
];

export default function SafariPlannerPage() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  const isSummary = step === steps.length;

  const select = (label: string) => {
    const newSel = [...selections];
    newSel[step] = label;
    setSelections(newSel);
  };

  const goNext = () => {
    if (selections[step]) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };
const sendInquiry = async () => {
  const data = {
    access_key: "2c6c7de7-225e-4037-ae95-723cba7ec428", // replace with your API key
    subject: "New Safari Inquiry",
    name: "Anonymous", // optional: you can collect a name input
    email: "joshuammbando636@gmail.com", // optional: collect from a field
    message: `
      Destination: ${selections[0] || "-"}
      Duration: ${selections[1] || "-"}
      Activities: ${selections[2] || "-"}
      Budget: ${selections[3] || "-"}
    `
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      alert("Inquiry sent successfully!");
      setStep(0);
      setSelections([]);
    } else {
      alert("Failed to send inquiry. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error sending inquiry. Check console for details.");
  }
};

  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('images/safariplan.avif')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Safari Planner</h1>
          <p className="mt-2 text-lg text-white/80">Design your dream Tanzania adventure in 4 easy steps</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Progress steps */}
        <div className="mb-12 flex items-center justify-center gap-2 flex-wrap">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => {
                  const maxReached = selections.length > 0 ? Math.max(...selections.map((_, idx) => idx).filter((idx) => selections[idx])) : -1;
                  if (i <= maxReached + 1) setStep(i);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/30" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && <div className={`h-0.5 w-8 transition-colors ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isSummary ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <AnimatedSection>
                <div className="text-center mb-8">
                  <currentStep.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">{currentStep.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Step {step + 1} of {steps.length}</p>
                </div>
              </AnimatedSection>

              <div className={`grid gap-4 max-w-5xl mx-auto ${currentStep.options.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
                {currentStep.options.map((opt) => (
                  <Card
                    key={opt.label}
                    className={`cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${selections[step] === opt.label ? "ring-2 ring-primary shadow-lg" : ""}`}
                    onClick={() => select(opt.label)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={opt.img} alt={opt.label} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                      {selections[step] === opt.label && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading text-sm font-semibold">{opt.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-10">
                {step > 0 && (
                  <Button variant="outline" onClick={goBack} className="gap-1 font-heading">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                )}
                <Button
                  onClick={goNext}
                  disabled={!selections[step]}
                  className="gap-1 font-heading font-semibold"
                >
                  {isLastStep ? "View Summary" : "Next"} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-center">Your Safari Summary</h2>
                  <div className="space-y-4">
                    {steps.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                        <s.icon className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">{s.title}</p>
                          <p className="font-heading text-sm font-semibold">{selections[i]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3 items-center">
                    <Button size="lg" className="font-heading font-semibold gap-2" onClick={sendInquiry}>
                     <Send className="h-4 w-4" /> Send Inquiry
                   </Button>
                    <Button variant="ghost" onClick={() => { setStep(0); setSelections([]); }} className="font-heading text-sm">
                      Start Over
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
