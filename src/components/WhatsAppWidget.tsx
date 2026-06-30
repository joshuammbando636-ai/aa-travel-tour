import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppWidget() {
  const phoneNumber = "255752108011";
  const message =
    "Hi! I'm interested in a safari to Tanzania. Can you help me plan?";

  // Universal WhatsApp link that works on mobile (app) and desktop (Web)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const [hovered, setHovered] = useState(false);

  // Array of colors for "Book Now!" texts
  const colors = ["#FF5F6D", "#FFC371", "#00C9FF", "#92FE9D", "#F6FF00"];

  return (
    <>
      {/* Background blur on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp button */}
      <div
        className="fixed bottom-6 left-6 z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg relative overflow-visible"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />

          {/* Pop-out colorful Book Now texts */}
          <AnimatePresence>
            {hovered &&
              [...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    x: Math.random() * 80 - 40,
                    y: Math.random() * -80 - 40,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    delay: i * 0.1,
                  }}
                  style={{
                    backgroundColor: colors[i % colors.length],
                    color: "white",
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full font-semibold text-xs shadow-md select-none pointer-events-none"
                >
                  Book now!
                </motion.span>
              ))}
          </AnimatePresence>

          {/* Ripple/flicker effect behind button */}
          <motion.div
            className="absolute h-14 w-14 rounded-full bg-[#25D366] opacity-30"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute h-14 w-14 rounded-full bg-[#25D366] opacity-20"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.a>
      </div>
    </>
  );
}
