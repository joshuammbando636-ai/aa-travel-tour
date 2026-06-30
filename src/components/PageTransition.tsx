import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
