import { useState, useEffect } from "react";
import { Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface Badge {
  id: string;
  name: string;
  emoji: string;
  requirement: string;
}

const allBadges: Badge[] = [
  { id: "explorer", name: "Explorer", emoji: "🧭", requirement: "Visit 3 pages" },
  { id: "safari_fan", name: "Safari Fan", emoji: "🦁", requirement: "View safaris page" },
  { id: "road_tripper", name: "Road Tripper", emoji: "🚗", requirement: "View car rental page" },
  { id: "nature_lover", name: "Nature Lover", emoji: "🌿", requirement: "View wildlife calendar" },
  { id: "photographer", name: "Photographer", emoji: "📸", requirement: "View photo gallery" },
];

function getVisitedPages(): string[] {
  try {
    return JSON.parse(localStorage.getItem("aa_visited_pages") || "[]");
  } catch { return []; }
}

function getEarnedBadges(visited: string[]): Badge[] {
  const earned: Badge[] = [];
  if (visited.length >= 3) earned.push(allBadges[0]);
  if (visited.includes("/safaris")) earned.push(allBadges[1]);
  if (visited.includes("/car-rental")) earned.push(allBadges[2]);
  if (visited.includes("/wildlife-calendar")) earned.push(allBadges[3]);
  if (visited.includes("/gallery")) earned.push(allBadges[4]);
  return earned;
}

export default function BadgeWidget() {
  const [open, setOpen] = useState(false);
  const [earned, setEarned] = useState<Badge[]>([]);
  const location = useLocation();

  useEffect(() => {
    const visited = getVisitedPages();
    if (!visited.includes(location.pathname)) {
      visited.push(location.pathname);
      localStorage.setItem("aa_visited_pages", JSON.stringify(visited));
    }
    setEarned(getEarnedBadges(visited));
  }, [location.pathname]);

  if (earned.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        aria-label="View badges"
      >
        <Award className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 w-64 rounded-xl border bg-card p-4 shadow-xl"
          >
            <p className="mb-3 font-heading text-sm font-semibold">Your Safari Badges</p>
            <div className="space-y-2">
              {earned.map((b) => (
                <div key={b.id} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-lg">{b.emoji}</span>
                  <div>
                    <p className="text-xs font-medium">{b.name}</p>
                    <p className="text-[10px] text-muted-foreground">{b.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground text-center">
              {earned.length}/{allBadges.length} badges earned
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
