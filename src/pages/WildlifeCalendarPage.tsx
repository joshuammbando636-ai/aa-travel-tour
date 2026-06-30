import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, CloudRain, Users, MapPin, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

type Season = "peak" | "good" | "low" | "none";

interface Wildlife {
  nameKey: string;
  emoji: string;
  seasons: Season[];
}

const wildlife: Wildlife[] = [
  { nameKey: "wildlife.greatMigration", emoji: "🦓", seasons: ["peak", "peak", "good", "low", "low", "good", "peak", "peak", "peak", "good", "good", "peak"] },
  { nameKey: "wildlife.bigFive", emoji: "🦁", seasons: ["peak", "peak", "good", "good", "low", "good", "peak", "peak", "peak", "peak", "good", "peak"] },
  { nameKey: "wildlife.elephantHerds", emoji: "🐘", seasons: ["good", "good", "good", "low", "low", "good", "peak", "peak", "peak", "peak", "good", "good"] },
  { nameKey: "wildlife.birdWatching", emoji: "🦅", seasons: ["good", "good", "peak", "peak", "peak", "good", "low", "low", "good", "peak", "peak", "good"] },
  { nameKey: "wildlife.whaleSharks", emoji: "🦈", seasons: ["low", "low", "low", "low", "low", "low", "low", "good", "peak", "peak", "peak", "peak"] },
  { nameKey: "wildlife.chimpanzees", emoji: "🐒", seasons: ["good", "good", "good", "low", "low", "good", "peak", "peak", "peak", "good", "good", "good"] },
  { nameKey: "wildlife.nestingTurtles", emoji: "🐢", seasons: ["low", "low", "good", "peak", "peak", "peak", "peak", "good", "low", "low", "low", "low"] },
  { nameKey: "wildlife.flamingos", emoji: "🦩", seasons: ["good", "good", "good", "good", "low", "good", "peak", "peak", "good", "good", "good", "good"] },
  { nameKey: "wildlife.wildebeestCalving", emoji: "🦌", seasons: ["peak", "peak", "good", "low", "low", "low", "low", "low", "low", "low", "good", "peak"] },
  { nameKey: "wildlife.riverCrossings", emoji: "🌊", seasons: ["low", "low", "low", "low", "low", "good", "peak", "peak", "good", "low", "low", "low"] },
  { nameKey: "wildlife.zebraMigration", emoji: "🦓", seasons: ["peak", "peak", "good", "low", "low", "low", "good", "peak", "peak", "good", "good", "peak"] },
  { nameKey: "wildlife.predatorAction", emoji: "🐆", seasons: ["peak", "peak", "good", "low", "low", "good", "peak", "peak", "peak", "good", "good", "peak"] },
];

const seasonColors: Record<Season, string> = {
  peak: "bg-green-500/20 text-green-700 dark:text-green-400 backdrop-blur-sm border border-green-500/30",
  good: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 backdrop-blur-sm border border-yellow-500/30",
  low: "bg-red-500/15 text-red-600 dark:text-red-400 backdrop-blur-sm border border-red-500/20",
  none: "bg-background",
};

// Updated Tanzania climate data (2024-2025 averages)
interface MonthData {
  highTemp: number;
  lowTemp: number;
  rainfall: number; // mm
  rainfallProb: string;
  crowdLevel: "Low" | "Medium" | "High" | "Peak";
  bestParks: string[];
  whatToSeeKey: string;
  migrationNoteKey: string;
}

const monthData: MonthData[] = [
  { 
    highTemp: 32, lowTemp: 22, rainfall: 70, rainfallProb: "30%", crowdLevel: "High",
    bestParks: ["parks.serengetiSouth", "parks.ngorongoro", "parks.manyara", "parks.tarangire"],
    whatToSeeKey: "whatToSee.jan",
    migrationNoteKey: "migrationNotes.jan"
  },
  { 
    highTemp: 33, lowTemp: 22, rainfall: 65, rainfallProb: "25%", crowdLevel: "High",
    bestParks: ["parks.serengetiSouth", "parks.ngorongoro", "parks.tarangire", "parks.manyara"],
    whatToSeeKey: "whatToSee.feb",
    migrationNoteKey: "migrationNotes.feb"
  },
  { 
    highTemp: 31, lowTemp: 21, rainfall: 140, rainfallProb: "65%", crowdLevel: "Low",
    bestParks: ["parks.serengetiWest", "parks.selous", "parks.ruaha", "parks.mahale"],
    whatToSeeKey: "whatToSee.mar",
    migrationNoteKey: "migrationNotes.mar"
  },
  { 
    highTemp: 29, lowTemp: 20, rainfall: 250, rainfallProb: "85%", crowdLevel: "Low",
    bestParks: ["parks.selous", "parks.ruaha", "parks.katavi", "parks.mahale"],
    whatToSeeKey: "whatToSee.apr",
    migrationNoteKey: "migrationNotes.apr"
  },
  { 
    highTemp: 29, lowTemp: 19, rainfall: 140, rainfallProb: "50%", crowdLevel: "Low",
    bestParks: ["parks.selous", "parks.ruaha", "parks.serengetiWest", "parks.gombe"],
    whatToSeeKey: "whatToSee.may",
    migrationNoteKey: "migrationNotes.may"
  },
  { 
    highTemp: 28, lowTemp: 17, rainfall: 10, rainfallProb: "5%", crowdLevel: "High",
    bestParks: ["parks.serengetiWest", "parks.tarangire", "parks.ngorongoro", "parks.manyara"],
    whatToSeeKey: "whatToSee.jun",
    migrationNoteKey: "migrationNotes.jun"
  },
  { 
    highTemp: 27, lowTemp: 15, rainfall: 5, rainfallProb: "2%", crowdLevel: "Peak",
    bestParks: ["parks.serengetiNorth", "parks.tarangire", "parks.ngorongoro", "parks.manyara"],
    whatToSeeKey: "whatToSee.jul",
    migrationNoteKey: "migrationNotes.jul"
  },
  { 
    highTemp: 28, lowTemp: 16, rainfall: 8, rainfallProb: "3%", crowdLevel: "Peak",
    bestParks: ["parks.serengetiNorth", "parks.ngorongoro", "parks.masaiMara", "parks.ruaha"],
    whatToSeeKey: "whatToSee.aug",
    migrationNoteKey: "migrationNotes.aug"
  },
  { 
    highTemp: 30, lowTemp: 17, rainfall: 12, rainfallProb: "8%", crowdLevel: "High",
    bestParks: ["parks.serengetiNorth", "parks.selous", "parks.tarangire", "parks.mafia"],
    whatToSeeKey: "whatToSee.sep",
    migrationNoteKey: "migrationNotes.sep"
  },
  { 
    highTemp: 31, lowTemp: 20, rainfall: 45, rainfallProb: "25%", crowdLevel: "Medium",
    bestParks: ["parks.serengeti", "parks.ngorongoro", "parks.tarangire", "parks.manyara"],
    whatToSeeKey: "whatToSee.oct",
    migrationNoteKey: "migrationNotes.oct"
  },
  { 
    highTemp: 31, lowTemp: 21, rainfall: 100, rainfallProb: "45%", crowdLevel: "Medium",
    bestParks: ["parks.serengeti", "parks.ngorongoro", "parks.manyara", "parks.arusha"],
    whatToSeeKey: "whatToSee.nov",
    migrationNoteKey: "migrationNotes.nov"
  },
  { 
    highTemp: 32, lowTemp: 22, rainfall: 95, rainfallProb: "40%", crowdLevel: "Peak",
    bestParks: ["parks.serengetiSouth", "parks.ngorongoro", "parks.zanzibar", "parks.tarangire"],
    whatToSeeKey: "whatToSee.dec",
    migrationNoteKey: "migrationNotes.dec"
  },
];

const crowdColors = {
  Low: "text-green-600 bg-green-500/10 backdrop-blur-sm",
  Medium: "text-yellow-600 bg-yellow-500/10 backdrop-blur-sm",
  High: "text-orange-600 bg-orange-500/10 backdrop-blur-sm",
  Peak: "text-red-600 bg-red-500/10 backdrop-blur-sm",
};

export default function WildlifeCalendarPage() {
  const { t, i18n } = useTranslation('wild');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const getWhatToSee = (monthIndex: number) => {
    const key = monthData[monthIndex].whatToSeeKey;
    const items = t(key, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  };

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <header className="relative flex h-[40vh] items-end bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {t('header.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-lg text-white/80"
          >
            {t('header.subtitle')}
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Legend */}
        <AnimatedSection>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-500/40 backdrop-blur-sm border border-green-500/50 shadow-lg shadow-green-500/10" />
              <span className="text-sm font-medium">{t('legend.peak')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-yellow-500/40 backdrop-blur-sm border border-yellow-500/50 shadow-lg shadow-yellow-500/10" />
              <span className="text-sm font-medium">{t('legend.good')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-red-500/30 backdrop-blur-sm border border-red-500/40 shadow-lg shadow-red-500/10" />
              <span className="text-sm font-medium">{t('legend.low')}</span>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Month selector */}
        <AnimatedSection delay={0.05}>
          <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {months.map((m, i) => {
              const data = monthData[i];
              const isSelected = selectedMonth === i;
              
              return (
                <motion.button
                  key={m}
                  onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
                  onHoverStart={() => setHoveredMonth(i)}
                  onHoverEnd={() => setHoveredMonth(null)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isSelected ? 1.05 : 1,
                    y: isSelected ? -2 : 0,
                  }}
                  className={`relative rounded-xl p-3 text-center transition-all overflow-hidden
                    ${isSelected 
                      ? "bg-white/20 dark:bg-black/20 backdrop-blur-md border-2 border-primary shadow-xl shadow-primary/20" 
                      : "bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 hover:border-primary/50"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                  
                  <div className="relative z-10">
                    <div className="font-heading text-sm font-bold">{t(`months.${m}`)}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                      <Thermometer className="h-3 w-3 text-orange-400" />
                      {data.highTemp}°C
                    </div>
                    
                    {isSelected && (
                      <motion.div 
                        layoutId="activeMonth"
                        className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Selected month detail panel */}
        <AnimatePresence mode="wait">
          {selectedMonth !== null && (
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-10"
            >
              <div className="relative rounded-2xl border border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="font-heading text-xl font-bold mb-4 flex items-center gap-2"
                  >
                    <Eye className="h-5 w-5 text-primary" />
                    {t(`months.${months[selectedMonth]}`)} — {t(monthData[selectedMonth].migrationNoteKey)}
                  </motion.h3>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    {/* Temperature */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 border border-white/10"
                    >
                      <Thermometer className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('details.temperature')}</p>
                        <p className="font-heading font-bold">{monthData[selectedMonth].highTemp}°C / {monthData[selectedMonth].lowTemp}°C</p>
                        <p className="text-xs text-muted-foreground">{t('details.highLow')}</p>
                      </div>
                    </motion.div>

                    {/* Rainfall */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 border border-white/10"
                    >
                      <CloudRain className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('details.rainfall')}</p>
                        <p className="font-heading font-bold">{monthData[selectedMonth].rainfall}mm</p>
                        <p className="text-xs text-muted-foreground">{t('details.probability')}: {monthData[selectedMonth].rainfallProb}</p>
                      </div>
                    </motion.div>

                    {/* Crowd Level */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 border border-white/10"
                    >
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('details.crowdLevel')}</p>
                        <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${crowdColors[monthData[selectedMonth].crowdLevel]}`}>
                          {t(`crowdLevels.${monthData[selectedMonth].crowdLevel}`)}
                        </span>
                      </div>
                    </motion.div>

                    {/* Best Parks */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-start gap-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 border border-white/10"
                    >
                      <MapPin className="h-6 w-6 text-green-600 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t('details.bestParks')}</p>
                        <div className="flex flex-wrap gap-1">
                          {monthData[selectedMonth].bestParks.map((parkKey) => (
                            <span key={parkKey} className="text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full">
                              {t(parkKey)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* What to see */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-heading text-sm font-semibold mb-2">{t('details.whatToSee')}</h4>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {getWhatToSee(selectedMonth).map((item: string, idx: number) => (
                        <motion.li 
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.35 + (idx * 0.05) }}
                          className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-lg p-2 border border-white/10"
                        >
                          <span className="text-primary">•</span> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wildlife table */}
        <AnimatedSection delay={0.1}>
          <motion.div 
            className="overflow-x-auto rounded-xl border border-white/20 bg-white/5 dark:bg-black/5 backdrop-blur-sm"
            whileHover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
                  <th className="sticky left-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm px-4 py-3 text-left font-heading font-semibold">
                    {t('wildlife.greatMigration').split(' ')[0]}
                  </th>
                  {months.map((m, i) => (
                    <th
                      key={m}
                      className={`px-2 py-3 text-center font-heading text-xs font-medium cursor-pointer transition-all
                        ${selectedMonth === i 
                          ? "bg-primary/20 text-primary" 
                          : "hover:bg-white/20 dark:hover:bg-black/20"
                        }`}
                      onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      <motion.span
                        animate={{ scale: hoveredMonth === i ? 1.1 : 1 }}
                      >
                        {t(`months.${m}`)}
                      </motion.span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wildlife.map((w, rowIdx) => (
                  <motion.tr 
                    key={w.nameKey} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    className="border-b border-white/10 transition-colors hover:bg-white/10 dark:hover:bg-black/10"
                  >
                    <td className="sticky left-0 bg-white/5 dark:bg-black/5 backdrop-blur-sm px-4 py-3 font-medium whitespace-nowrap">
                      <span className="mr-2">{w.emoji}</span>{t(w.nameKey)}
                    </td>
                    {w.seasons.map((s, i) => (
                      <td key={i} className="px-1 py-2 text-center">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`mx-auto rounded-md px-1 py-1 text-[10px] font-medium ${seasonColors[s]}`}
                        >
                          {s !== "none" ? t(`seasonLabels.${s}`) : ""}
                        </motion.div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-xs text-muted-foreground bg-white/5 dark:bg-black/5 backdrop-blur-sm p-3 rounded-full inline-block mx-auto w-auto px-6"
          >
            {t('footer.text')}
          </motion.p>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}