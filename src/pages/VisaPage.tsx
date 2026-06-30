// src/pages/VisaPage.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Plane, 
  Users, 
  Workflow,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Stamp,
  Luggage
} from "lucide-react";

export default function VisaPage() {
  const { t, i18n } = useTranslation('visa');
  
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

  const services = [
    {
      title: t('services.tourist.title'),
      description: t('services.tourist.description'),
      icon: <Globe className="h-8 w-8" />,
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: t('services.business.title'),
      description: t('services.business.description'),
      icon: <Briefcase className="h-8 w-8" />,
      color: "from-purple-500/20 to-purple-600/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: t('services.student.title'),
      description: t('services.student.description'),
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-green-500/20 to-green-600/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: t('services.work.title'),
      description: t('services.work.description'),
      icon: <Workflow className="h-8 w-8" />,
      color: "from-orange-500/20 to-orange-600/20",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      title: t('services.transit.title'),
      description: t('services.transit.description'),
      icon: <Plane className="h-8 w-8" />,
      color: "from-cyan-500/20 to-cyan-600/20",
      textColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      title: t('services.dependent.title'),
      description: t('services.dependent.description'),
      icon: <Users className="h-8 w-8" />,
      color: "from-pink-500/20 to-pink-600/20",
      textColor: "text-pink-600 dark:text-pink-400"
    }
  ];

  const visaCategories = [
    {
      category: t('visaCategories.shortTerm'),
      items: [
        t('visaCategories.items.tourist'),
        t('visaCategories.items.business'),
        t('visaCategories.items.transit'),
        t('visaCategories.items.visit')
      ],
      icon: <Plane className="h-5 w-5" />
    },
    {
      category: t('visaCategories.longTerm'),
      items: [
        t('visaCategories.items.work'),
        t('visaCategories.items.student'),
        t('visaCategories.items.residence'),
        t('visaCategories.items.investment')
      ],
      icon: <Luggage className="h-5 w-5" />
    },
    {
      category: t('visaCategories.special'),
      items: [
        t('visaCategories.items.diplomatic'),
        t('visaCategories.items.medical'),
        t('visaCategories.items.conference'),
        t('visaCategories.items.journalist')
      ],
      icon: <Stamp className="h-5 w-5" />
    }
  ];

  // Countries with flag emojis - keeping emojis static, only names translate
  const countries = [
    { name: t('countries.dubai'), flag: "🇦🇪", code: "AE" },
    { name: t('countries.qatar'), flag: "🇶🇦", code: "QA" },
    { name: t('countries.saudi'), flag: "🇸🇦", code: "SA" },
    { name: t('countries.china'), flag: "🇨🇳", code: "CN" },
    { name: t('countries.uk'), flag: "🇬🇧", code: "GB" },
    { name: t('countries.usa'), flag: "🇺🇸", code: "US" },
    { name: t('countries.vietnam'), flag: "🇻🇳", code: "VN" },
    { name: t('countries.thailand'), flag: "🇹🇭", code: "TH" },
    { name: t('countries.spain'), flag: "🇪🇸", code: "ES" },
    { name: t('countries.france'), flag: "🇫🇷", code: "FR" },
    { name: t('countries.italy'), flag: "🇮🇹", code: "IT" },
    { name: t('countries.tanzania'), flag: "🇹🇿", code: "TZ" },
    { name: t('countries.nigeria'), flag: "🇳🇬", code: "NG" },
    { name: t('countries.egypt'), flag: "🇪🇬", code: "EG" }
  ];

  const features = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: t('features.success.title'),
      description: t('features.success.description')
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: t('features.processing.title'),
      description: t('features.processing.description')
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      title: t('features.confidential.title'),
      description: t('features.confidential.description')
    },
    {
      icon: <FileText className="h-5 w-5 text-orange-500" />,
      title: t('features.document.title'),
      description: t('features.document.description')
    }
  ];

  // Improved flag renderer with better emoji support
  const renderFlag = (country) => {
    return (
      <span 
        className="text-3xl mb-2 block"
        role="img"
        aria-label={`Flag of ${country.name}`}
        style={{ 
          fontFamily: "'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne Color', 'Twemoji Mozilla', 'system-ui', sans-serif",
          lineHeight: 1
        }}
      >
        {country.flag}
      </span>
    );
  };

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/visa/visa.avif')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              {t('page.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-xl md:text-2xl text-white/90 font-light">
              {t('page.subtitle')}
            </p>
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

      {/* Main Content */}
      <main className="relative">
        {/* Features Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background/80 backdrop-blur-md border-b"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3"
                >
                  {feature.icon}
                  <div>
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Description with stats */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-12 items-center mb-20"
            >
              <motion.div variants={fadeInUp}>
                <span className="text-primary font-medium mb-2 block text-sm">
                  {t('whyChooseUs.badge')}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  {t('whyChooseUs.title')}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t('whyChooseUs.description')}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  {[
                    { value: t('whyChooseUs.stats.experience.value'), label: t('whyChooseUs.stats.experience.label') },
                    { value: t('whyChooseUs.stats.countries.value'), label: t('whyChooseUs.stats.countries.label') },
                    { value: t('whyChooseUs.stats.clients.value'), label: t('whyChooseUs.stats.clients.label') }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-2xl p-8 border shadow-xl">
                  <h3 className="font-heading text-xl font-bold mb-4">
                    {t('simpleProcess.title')}
                  </h3>
                  <div className="space-y-4">
                    {[
                      t('simpleProcess.steps.step1'),
                      t('simpleProcess.steps.step2'),
                      t('simpleProcess.steps.step3'),
                      t('simpleProcess.steps.step4')
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-sm md:text-base">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Countries Grid */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-20"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <span className="text-primary font-medium mb-2 block text-sm">
                  {t('globalReach.badge')}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('globalReach.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                  {t('globalReach.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {countries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-card rounded-xl p-4 text-center border hover:border-primary/50 transition-colors">
                      {/* Flag with improved rendering */}
                      <div className="mb-2 flex justify-center">
                        {renderFlag(country)}
                      </div>
                      {/* Country name */}
                      <span className="text-xs font-medium block break-words">
                        {country.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                {t('globalReach.andMore')}
              </p>
            </motion.div>

            {/* Visa Categories */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-20"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <span className="text-primary font-medium mb-2 block text-sm">
                  {t('visaCategories.badge')}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('visaCategories.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                  {t('visaCategories.subtitle')}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {visaCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl border p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {category.icon}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-4">{category.category}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {t('visaCategories.additional')}
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
              
              <div className="relative z-10 px-8 py-16 text-center text-white">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('cta.title')}
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
                  {t('cta.subtitle')}
                </p>
                <Link to="/contact">
                  <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all text-base">
                    {t('cta.button')}
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-20 rounded-2xl bg-muted/30 p-8 text-center border"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t('additionalInfo.text')}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}