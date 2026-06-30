import { useState } from "react";
import { Heart, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { label: "24/7 Emergency", number: "+255 787 447 553", icon: Phone, color: "text-red-600" },
    { label: "Ambulance", number: "112", icon: Heart, color: "text-red-500" },
    { label: "Police", number: "111", icon: Phone, color: "text-blue-600" },
    { label: "Fire", number: "114", icon: Phone, color: "text-orange-600" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 mb-2"
          >
            <Card className="w-72 shadow-2xl">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-red-600">Emergency Contacts</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 hover:bg-muted"
                    aria-label="Close emergency contacts"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {emergencyContacts.map((contact) => (
                    <a
                      key={contact.label}
                      href={`tel:${contact.number.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted"
                    >
                      <contact.icon className={`h-5 w-5 ${contact.color}`} />
                      <div className="flex-1">
                        <p className="text-xs font-medium">{contact.label}</p>
                        <p className="text-sm font-semibold">{contact.number}</p>
                      </div>
                    </a>
                  ))}

                  <a
                    href="https://www.google.com/maps/search/hospital+near+dar+es+salaam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted"
                  >
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Nearest Hospital</p>
                      <p className="text-xs text-muted-foreground">View on Google Maps</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(220, 38, 38, 0.7)",
            "0 0 0 10px rgba(220, 38, 38, 0)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          },
        }}
        aria-label="Emergency contacts"
      >
        <Heart className="h-7 w-7" />
      </motion.button>
    </div>
  );
}
