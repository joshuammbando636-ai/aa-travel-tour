import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Info, Thermometer, CloudRain, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const months = [
  { name: "Jan", season: "good", info: "Great Migration calving in southern Serengeti", temp: "32/22°C", rain: "35%", crowd: "Medium" },
  { name: "Feb", season: "peak", info: "Peak calving — 8,000 wildebeest born daily", temp: "33/22°C", rain: "30%", crowd: "High" },
  { name: "Mar", season: "good", info: "Long rains begin, migratory birds arrive", temp: "31/21°C", rain: "60%", crowd: "Low" },
  { name: "Apr", season: "low", info: "Heavy rains — discounted rates available", temp: "29/21°C", rain: "80%", crowd: "Low" },
  { name: "May", season: "low", info: "End of long rains, Western Corridor migration begins", temp: "29/19°C", rain: "55%", crowd: "Low" },
  { name: "Jun", season: "peak", info: "Dry season begins — Grumeti River crossings", temp: "28/17°C", rain: "10%", crowd: "High" },
  { name: "Jul", season: "peak", info: "Mara River crossings begin — peak safari", temp: "27/15°C", rain: "5%", crowd: "Peak" },
  { name: "Aug", season: "peak", info: "Peak Mara River crossings — best game viewing", temp: "28/16°C", rain: "5%", crowd: "Peak" },
  { name: "Sep", season: "peak", info: "Northern Serengeti migration continues", temp: "30/17°C", rain: "10%", crowd: "High" },
  { name: "Oct", season: "good", info: "Short rains, whale sharks at Mafia Island", temp: "31/20°C", rain: "30%", crowd: "Medium" },
  { name: "Nov", season: "good", info: "Green season — fewer crowds, great rates", temp: "31/21°C", rain: "50%", crowd: "Medium" },
  { name: "Dec", season: "good", info: "Holiday season — migration returns south", temp: "32/22°C", rain: "45%", crowd: "High" },
];

const seasonColors = {
  peak: "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-400",
  good: "bg-yellow-500/15 border-yellow-500/30 text-yellow-700 dark:text-yellow-400",
  low: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
};

const seasonLabels = {
  peak: "Excellent",
  good: "Good",
  low: "Avoid",
};

export default function AvailabilityCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-heading text-lg font-semibold">Best Time to Visit</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-green-500/40" /><span>Excellent</span></div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-yellow-500/40" /><span>Good</span></div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded-full bg-red-500/30" /><span>Avoid</span></div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {months.map((month, i) => (
            <button
              key={i}
              onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
              className={cn(
                "relative rounded-lg border-2 p-3 text-center transition-all hover:scale-105",
                seasonColors[month.season as keyof typeof seasonColors],
                selectedMonth === i && "ring-2 ring-primary shadow-md"
              )}
            >
              <div className="font-heading text-sm font-bold">{month.name}</div>
              <div className="mt-1 text-[10px] opacity-70">{seasonLabels[month.season as keyof typeof seasonLabels]}</div>
            </button>
          ))}
        </div>

        {selectedMonth !== null && (
          <div className="mt-4 space-y-3 rounded-xl border bg-muted/50 p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-semibold">{months[selectedMonth].name}</p>
                <p className="text-xs text-muted-foreground">{months[selectedMonth].info}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Thermometer className="h-3 w-3 text-orange-500" />
                <span>{months[selectedMonth].temp}</span>
              </div>
              <div className="flex items-center gap-1">
                <CloudRain className="h-3 w-3 text-blue-500" />
                <span>Rain: {months[selectedMonth].rain}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-primary" />
                <span>{months[selectedMonth].crowd}</span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Click any month for temperature, rainfall & crowd data. Based on Tanzania Meteorological Authority records.
        </p>
      </CardContent>
    </Card>
  );
}
