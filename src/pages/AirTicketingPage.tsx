import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react"; // ADDED THIS IMPORT
import { 
  Plane, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Shield, 
  Globe, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  HeadphonesIcon,
  CreditCard,
  Luggage,
  Star,
  Image
} from "lucide-react";

// Placeholder for airline logos - you can add your image paths here
const airlines = [
  { nameKey: "airlines.american", img: "images/logo/america.png" },
  { nameKey: "airlines.swiss", img: "images/logo/swiss.png" },
  { nameKey: "airlines.british", img: "images/logo/british.png" },
  { nameKey: "airlines.qatar", img: "images/logo/qatar.png" },
  { nameKey: "airlines.emirates", img: "images/logo/emirates.png" },
  { nameKey: "airlines.turkish", img: "images/logo/turkish.png" },
];

export default function AirTicketingPage() {
  const { t, i18n } = useTranslation('air');
  
  // ADDED DEBUGGING CODE
  useEffect(() => {
    console.log('=== AIR PAGE DEBUG ===');
    console.log('1. Current language:', i18n.language);
    console.log('2. Available languages:', i18n.languages);
    console.log('3. Has air namespace:', i18n.hasResourceBundle(i18n.language, 'air'));
    console.log('4. Test translation - hero.title:', t('hero.title', { defaultValue: 'FALLBACK TEXT' }));
    console.log('5. Test translation - hero.badge:', t('hero.badge', { defaultValue: 'FALLBACK BADGE' }));
    console.log('6. All air translations:', i18n.getResourceBundle(i18n.language, 'air'));
    console.log('7. i18n options:', i18n.options);
  }, [i18n.language]);
  
  // Benefits with translations
  const benefits = [
    { icon: <Globe className="h-5 w-5" />, titleKey: "benefits.global.title", descriptionKey: "benefits.global.description" },
    { icon: <Clock className="h-5 w-5" />, titleKey: "benefits.support.title", descriptionKey: "benefits.support.description" },
    { icon: <Shield className="h-5 w-5" />, titleKey: "benefits.price.title", descriptionKey: "benefits.price.description" },
    { icon: <CreditCard className="h-5 w-5" />, titleKey: "benefits.payment.title", descriptionKey: "benefits.payment.description" },
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />

      {/* HERO SECTION with cinematic background */}
      <header className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
        {/* Background with overlay */}
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/airlines/tz.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </motion.div>
        
        {/* Animated particles/planes */}
        <motion.div 
          animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 text-white/10"
        >
          <Plane className="h-20 w-20" />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-20 text-white/10"
        >
          <Plane className="h-16 w-16 rotate-45" />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white">{t('hero.badge')}</span>
            </motion.div>

            <h1 className="font-heading text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="font-heading font-semibold px-8 text-base h-14">
                    {t('hero.button')}
                    <Plane className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        
        {/* Benefits Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background/80 backdrop-blur-md border-y mb-16"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t(benefit.titleKey)}</p>
                    <p className="text-xs text-muted-foreground">{t(benefit.descriptionKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AIR TICKETING & FLIGHT BOOKINGS */}
        <AnimatedSection>
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {t('services.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('services.description1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              {t('services.description2')}
            </p>
          </motion.div>
        </AnimatedSection>

        {/* AIRLINE PARTNERS */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-primary font-medium mb-2 block text-sm flex items-center justify-center gap-2">
              <Award className="h-4 w-4" /> {t('partners.badge')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('partners.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              {t('partners.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {airlines.map((airline, i) => (
              <motion.div
                key={airline.nameKey}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                  <div className="relative flex flex-col items-center justify-center p-2">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Round logo container */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative w-28 h-28 rounded-full bg-gradient-to-br from-background to-muted/80 shadow-lg flex items-center justify-center p-4 border border-primary/10 group-hover:border-primary/30 transition-all"
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50" />
                      
                      {/* Logo or placeholder */}
                      {airline.img ? (
                        <img
                          src={airline.img}
                          alt={t(airline.nameKey)}
                          className="w-full h-full object-contain relative z-10 drop-shadow-md"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-muted/50 flex items-center justify-center relative z-10">
                          <Image className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      )}

                      {/* Floating plane icon on hover */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute -right-1 -top-1 bg-primary text-white p-1.5 rounded-full shadow-lg"
                      >
                        <Plane className="h-3 w-3" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Airline name */}
                    <h3 className="font-heading font-semibold text-sm mt-3 text-center">
                      {t(airline.nameKey)}
                    </h3>

                    {/* Small decorative element */}
                    <div className="w-8 h-0.5 bg-primary/20 rounded-full mt-1 group-hover:w-12 transition-all" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEED ASSISTANCE */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('assistance.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base mb-6">
              {t('assistance.subtitle')}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-8 text-foreground mb-6">
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                href="tel:+255752108011"
                className="inline-flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                +255 752 108 011
              </motion.a>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                href="mailto:info@aatravel.co.tz"
                className="inline-flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                info@aatravel.co.tz
              </motion.a>
            </div>
            
            <div className="bg-muted/30 rounded-2xl p-6 max-w-md">
              <h4 className="font-heading font-semibold mb-3 text-center">{t('assistance.whyCall')}</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('assistance.features.instant')}
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('assistance.features.guarantee')}
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('assistance.features.support')}
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}