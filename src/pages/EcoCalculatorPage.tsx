import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Leaf, TreePine, Droplets, Plane, Car, Footprints, Sparkles, Gauge, TreeDeciduous } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const COLORS = ["hsl(30, 45%, 59%)", "hsl(121, 37%, 27%)", "hsl(25, 76%, 31%)", "hsl(30, 15%, 92%)"];

export default function EcoCalculatorPage() {
  const { t, i18n } = useTranslation('eco');
  const [tripType, setTripType] = useState("");
  const [duration, setDuration] = useState("5");
  const [groupSize, setGroupSize] = useState("2");
  const [transport, setTransport] = useState("");
  const [result, setResult] = useState<null | { total: number; data: { name: string; value: number }[]; trees: number }>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [activeTip, setActiveTip] = useState("");

  // Show eco tip based on selections
  useEffect(() => {
    if (tripType && t(`ecoTips.${tripType}`)) {
      setActiveTip(t(`ecoTips.${tripType}`));
      setShowTip(true);
    } else if (transport && t(`ecoTips.${transport}`)) {
      setActiveTip(t(`ecoTips.${transport}`));
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  }, [tripType, transport, t]);

  const calculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for smooth animation
    setTimeout(() => {
      const days = parseInt(duration) || 5;
      const people = parseInt(groupSize) || 2;
      
      // More realistic calculation factors
      const transportFactor = transport === "flight" ? 280 : transport === "drive" ? 90 : transport === "mixed" ? 160 : 50;
      const accomFactor = tripType === "luxury" ? 45 : tripType === "mid" ? 28 : 18;
      const activityFactor = tripType === "luxury" ? 15 : tripType === "mid" ? 12 : 8;
      
      // Distance-based calculation
      const avgDailyDistance = transport === "flight" ? 200 : transport === "drive" ? 120 : 80;
      
      const transportCO2 = (transportFactor * avgDailyDistance * days) / 100;
      const accomCO2 = accomFactor * days;
      const activityCO2 = activityFactor * days;
      const foodCO2 = (tripType === "luxury" ? 12 : tripType === "mid" ? 9 : 6) * days;
      
      // More accurate total with rounding
      const total = Math.round((transportCO2 + accomCO2 + activityCO2 + foodCO2) * people);
      
      // Calculate trees needed to offset (1 tree absorbs ~20kg CO2 per year)
      const treesNeeded = Math.ceil(total / 20);

      setResult({
        total,
        trees: treesNeeded,
        data: [
          { name: t('results.breakdown.transport'), value: Math.round(transportCO2 * people) },
          { name: t('results.breakdown.accommodation'), value: Math.round(accomCO2 * people) },
          { name: t('results.breakdown.activities'), value: Math.round(activityCO2 * people) },
          { name: t('results.breakdown.food'), value: Math.round(foodCO2 * people) },
        ],
      });
      
      setIsCalculating(false);
    }, 800);
  };

  // Comparison with average (global average footprint per person ~4 tons/year)
  const getComparison = () => {
    if (!result) return null;
    const perPerson = result.total / parseInt(groupSize);
    if (perPerson < 100) return t('comparisons.excellent');
    if (perPerson < 200) return t('comparisons.good');
    return t('comparisons.consider');
  };

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      
      {/* Hero with parallax effect */}
      <header className="relative flex h-[40vh] items-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('images/eco.avif')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 pb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="h-6 w-6 text-secondary" />
            <span className="text-secondary font-medium">{t('header.badge')}</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">{t('header.title')}</h1>
          <p className="mt-2 text-lg text-white/80">{t('header.subtitle')}</p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form Section */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-2 hover:border-secondary/20 transition-all">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-secondary" />
                    <h2 className="font-heading text-xl font-bold">{t('form.title')}</h2>
                  </div>

                  {/* Trip Type with icons */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t('form.tripStyle')}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "budget", label: t('tripTypes.budget'), icon: "🎒" },
                        { value: "mid", label: t('tripTypes.mid'), icon: "🏕️" },
                        { value: "luxury", label: t('tripTypes.luxury'), icon: "✨" }
                      ].map((type) => (
                        <motion.button
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTripType(type.value)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            tripType === type.value 
                              ? "border-secondary bg-secondary/10" 
                              : "border-border hover:border-secondary/30"
                          }`}
                        >
                          <div className="text-2xl mb-1">{type.icon}</div>
                          <div className="text-xs font-medium">{type.label}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground">{t('form.duration')}</label>
                      <motion.span 
                        key={duration}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-bold text-secondary"
                      >
                        {duration} {parseInt(duration) === 1 ? t('form.day') : t('form.days')}
                      </motion.span>
                    </div>
                    <Slider
                      value={[parseInt(duration)]}
                      min={1}
                      max={21}
                      step={1}
                      onValueChange={(value) => setDuration(value[0].toString())}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 {t('form.day')}</span>
                      <span>7 {t('form.days')}</span>
                      <span>14 {t('form.days')}</span>
                      <span>21 {t('form.days')}</span>
                    </div>
                  </div>

                  {/* Group Size with counter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t('form.groupSize')}</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGroupSize(Math.max(1, parseInt(groupSize) - 1).toString())}
                        className="h-10 w-10 rounded-full"
                      >
                        -
                      </Button>
                      <motion.div 
                        key={groupSize}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="flex-1 text-center font-bold text-xl"
                      >
                        {groupSize} {parseInt(groupSize) === 1 ? t('form.person') : t('form.people')}
                      </motion.div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGroupSize(Math.min(20, parseInt(groupSize) + 1).toString())}
                        className="h-10 w-10 rounded-full"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Transport with icons */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t('form.transport')}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "flight", label: t('transportTypes.flight'), icon: <Plane className="h-4 w-4" /> },
                        { value: "drive", label: t('transportTypes.drive'), icon: <Car className="h-4 w-4" /> },
                        { value: "mixed", label: t('transportTypes.mixed'), icon: <Footprints className="h-4 w-4" /> }
                      ].map((type) => (
                        <motion.button
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTransport(type.value)}
                          className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                            transport === type.value 
                              ? "border-secondary bg-secondary/10" 
                              : "border-border hover:border-secondary/30"
                          }`}
                        >
                          {type.icon}
                          <span className="text-xs font-medium">{type.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Eco Tip */}
                  <AnimatePresence>
                    {showTip && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-secondary/10 rounded-xl p-3 flex items-start gap-2"
                      >
                        <Sparkles className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">{activeTip}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Calculate Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={calculate} 
                      className="w-full font-heading font-semibold h-12 text-base"
                      disabled={!tripType || !transport || isCalculating}
                    >
                      {isCalculating ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Leaf className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        t('form.calculate')
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>

          {/* Results Section */}
          <AnimatedSection delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-2 border-secondary/20">
                      <CardContent className="p-6">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-center"
                        >
                          <h3 className="font-heading text-xl font-bold mb-2">{t('results.title')}</h3>
                          <motion.p 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="text-5xl font-bold text-primary"
                          >
                            {result.total}
                          </motion.p>
                          <p className="text-sm text-muted-foreground mt-1">{t('results.unit')}</p>
                        </motion.div>

                        {/* Tree offset */}
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4 bg-secondary/10 rounded-xl p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <TreeDeciduous className="h-5 w-5 text-secondary" />
                            <span className="text-sm">{t('results.treesToOffset')}</span>
                          </div>
                          <span className="font-bold text-xl">{result.trees} {t('results.trees')}</span>
                        </motion.div>

                        {/* Chart */}
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="h-64 mt-4"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={result.data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                animationBegin={400}
                                animationDuration={1000}
                              >
                                {result.data.map((_, i) => (
                                  <Cell key={i} fill={COLORS[i]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value) => [`${value} ${t('results.unit')}`, t('results.breakdown.transport').split(' ')[0]]}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255,255,255,0.9)',
                                  backdropFilter: 'blur(8px)',
                                  border: '1px solid rgba(0,0,0,0.1)',
                                  borderRadius: '8px'
                                }}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </motion.div>

                        {/* Comparison text */}
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-center text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg"
                        >
                          {getComparison()}
                        </motion.p>

                        {/* Action button */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-4"
                        >
                          <Button variant="outline" className="w-full gap-2">
                            <TreePine className="h-4 w-4" />
                            {t('results.offset')}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Leaf className="h-20 w-20 text-secondary/30 mb-4" />
                    </motion.div>
                    <p className="text-muted-foreground max-w-sm">
                      {t('placeholder.text')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Eco initiatives with hover effects */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: TreePine, title: t('initiatives.tree.title'), desc: t('initiatives.tree.description'), color: "text-green-600" },
              { icon: Leaf, title: t('initiatives.carbon.title'), desc: t('initiatives.carbon.description'), color: "text-secondary" },
              { icon: Droplets, title: t('initiatives.water.title'), desc: t('initiatives.water.description'), color: "text-blue-600" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="group cursor-pointer hover:border-secondary/30 transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`mx-auto mb-3 h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors`}
                    >
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </motion.div>
                    <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Footer note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          {t('footer.note')}
        </motion.p>
      </main>
      <Footer />
    </div>
  );
}