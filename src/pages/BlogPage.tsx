import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Tag, ArrowRight, ArrowLeft, Heart, Bookmark, MapPin, Star, Users, Plane, Hotel, Utensils, Bus, Camera, Trophy, X, Check, Globe, Wallet, Maximize2, Compass, Sun, Moon, Coffee, Gift, Shield, CreditCard, Map, Navigation, Wind, Cloud, Umbrella, Thermometer } from "lucide-react";
import { useTranslation } from "react-i18next";

// Blog posts with real ArcGIS StoryMaps URLs
const blogPosts = [
  {
    id: 1,
    titleKey: "posts.0.title",
    excerptKey: "posts.0.excerpt",
    image: "images/migr.avif",
    authorKey: "posts.0.author",
    dateKey: "posts.0.date",
    readTimeKey: "posts.0.readTime",
    categoryKey: "posts.0.category",
    tagsKey: "posts.0.tags",
    url: "https://storymaps.arcgis.com/stories/da3c674bdcc44265af0d5e85d8403583"
  },
  {
    id: 2,
    titleKey: "posts.1.title",
    excerptKey: "posts.1.excerpt",
    image: "images/mountkili.avif",
    authorKey: "posts.1.author",
    dateKey: "posts.1.date",
    readTimeKey: "posts.1.readTime",
    categoryKey: "posts.1.category",
    tagsKey: "posts.1.tags",
    url: "https://storymaps.arcgis.com/stories/c234f963b7f74909abc5983e39abb10f"
  },
  {
    id: 3,
    titleKey: "posts.2.title",
    excerptKey: "posts.2.excerpt",
    image: "images/kit.avif",
    authorKey: "posts.2.author",
    dateKey: "posts.2.date",
    readTimeKey: "posts.2.readTime",
    categoryKey: "posts.2.category",
    tagsKey: "posts.2.tags",
    url: "https://storymaps.arcgis.com/stories/0edef52ad0e441cc997f80848a17ae4f"
  }
];

// Package data with separate thumbnail and full image paths
const packages = [
  {
    id: 1,
    region: "Europe",
    regionKey: "packageDetails.europe.region",
    titleKey: "packageDetails.europe.title",
    thumbnail: "images/logo/europe.jpeg",
    fullImage: "images/logo/europe.jpeg",
    dates: ["11TH MAY 2026", "15TH JUN 2026", "12TH JUL 2026", "16TH AUG 2026"],
    durationKey: "packageDetails.europe.duration",
    priceKey: "packageDetails.europe.price",
    basisKey: "packageDetails.europe.basis",
    highlightsKey: "packageDetails.europe.highlights",
    itineraryKey: "packageDetails.europe.itinerary",
    inclusionsKey: "packageDetails.europe.inclusions",
    accommodationKey: "packageDetails.europe.accommodation",
    bestTimeKey: "packageDetails.europe.bestTime",
    groupSizeKey: "packageDetails.europe.groupSize",
    countries: ["France", "Belgium", "Netherlands", "Germany", "Switzerland", "Liechtenstein", "Austria", "Italy"],
    locations: ["Paris", "Brussels", "Amsterdam", "Berlin", "Swiss Alps", "Vaduz", "Vienna", "Rome"]
  },
  {
    id: 2,
    region: "South Africa",
    regionKey: "packageDetails.southAfrica.region",
    titleKey: "packageDetails.southAfrica.title",
    thumbnail: "images/logo/southafrica.jpeg",
    fullImage: "images/logo/southafrica.jpeg",
    dates: ["Eid Special Package"],
    durationKey: "packageDetails.southAfrica.duration",
    priceKey: "packageDetails.southAfrica.price",
    basisKey: "packageDetails.southAfrica.basis",
    highlightsKey: "packageDetails.southAfrica.highlights",
    itineraryKey: "packageDetails.southAfrica.itinerary",
    inclusionsKey: "packageDetails.southAfrica.inclusions",
    locations: ["Soweto", "Pilanesberg", "Sun City", "Cradle of Humankind"],
    countries: ["South Africa"]
  },
  {
    id: 3,
    region: "Egypt",
    regionKey: "packageDetails.egypt.region",
    titleKey: "packageDetails.egypt.title",
    thumbnail: "images/logo/egypt.jpeg",
    fullImage: "images/logo/egypt.jpeg",
    dates: ["1st March 2026 to 30th April 2026"],
    durationKey: "packageDetails.egypt.duration",
    priceKey: "packageDetails.egypt.price",
    basisKey: "packageDetails.egypt.basis",
    highlightsKey: "packageDetails.egypt.highlights",
    itineraryKey: "packageDetails.egypt.itinerary",
    inclusionsKey: "packageDetails.egypt.inclusions",
    locations: ["Cairo", "Luxor"],
    countries: ["Egypt"]
  }
];

const inclusionIcons = {
  "Hotel Stay": <Hotel className="h-4 w-4" />,
  "Breakfast + Dinner": <Utensils className="h-4 w-4" />,
  "Airport Transfers": <Plane className="h-4 w-4" />,
  "Sightseeings": <Camera className="h-4 w-4" />,
  "Tour Manager service": <Users className="h-4 w-4" />
};

export default function BlogPage() {
  const { t, i18n } = useTranslation('blog');
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("list");
  const [currentPost, setCurrentPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [showPackages, setShowPackages] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      const post = blogPosts.find(p => p.id === parseInt(id));
      if (post) {
        setCurrentPost(post);
        setCurrentView("post");
        window.scrollTo(0, 0);
      }
    } else {
      setCurrentView("list");
      setCurrentPost(null);
    }
  }, [id]);

  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
  const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };
  
  const goBackToList = () => {
    setCurrentView("list");
    setCurrentPost(null);
    navigate("/blog");
  };

  const openPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    document.body.style.overflow = 'hidden';
  };

  const closePackageModal = () => {
    setSelectedPackage(null);
    document.body.style.overflow = 'unset';
  };

  const handleBookNow = () => {
    closePackageModal();
    navigate("/contact");
  };

  // Helper function to get array from translation
  const getArrayFromKey = (key) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };

  return (
    <div className="min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <AnimatePresence mode="wait">
        {currentView === "list" ? (
          <motion.div 
            key="list" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={selectedPackage ? "blur-sm transition-all duration-300" : ""}
          >
            <header className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
              <div className="absolute inset-0"><img src="images/hotba.webp" alt="Blog Hero" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-black/50" /></div>
              <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl font-bold md:text-5xl mb-2">{t('header.title')}</motion.h1>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl text-lg text-white/80">{t('header.subtitle')}</motion.p>
              </div>
            </header>

            <main className="container mx-auto px-4 py-12">

              {/* Featured Packages Section */}
              {showPackages && packages.length > 0 && (
                <AnimatedSection>
                  <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-2xl font-bold">{t('packages.title')}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {packages.map((pkg) => (
                        <motion.div 
                          key={pkg.id} 
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="cursor-default"
                        >
                          <Card className="overflow-hidden shadow-lg group h-full hover:shadow-2xl transition-all">
                            <div className="relative h-40 overflow-hidden">
                              <img src={pkg.thumbnail} alt={t(pkg.titleKey)} className="h-full w-full object-cover" />
                              <Badge className="absolute top-2 right-2 bg-primary/90 text-white border-0">{t(pkg.regionKey)}</Badge>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-heading font-bold text-sm line-clamp-1">{t(pkg.titleKey)}</h3>
                                <span className="font-bold text-primary">{t(pkg.priceKey)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t(pkg.titleKey)}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" /> {t(pkg.durationKey)}
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                  {pkg.locations?.slice(0, 3).map((loc, i) => (
                                    <motion.div 
                                      key={i} 
                                      whileHover={{ scale: 1.1, zIndex: 10 }}
                                      className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background"
                                    >
                                      <MapPin className="h-3 w-3 text-primary" />
                                    </motion.div>
                                  ))}
                                  {pkg.locations?.length > 3 && (
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                                      <span className="text-[10px] font-medium">+{pkg.locations.length - 3}</span>
                                    </div>
                                  )}
                                </div>
                                <motion.button
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openPackageModal(pkg)}
                                  className="text-primary text-xs font-medium inline-flex items-center gap-1"
                                >
                                  {t('packages.moreInfo')} <ArrowRight className="h-3 w-3" />
                                </motion.button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Blog Posts Grid */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold mb-6">{t('blog.title')}</h2>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.slice(0, visiblePosts).map((post) => (
                    <motion.div key={post.id} variants={fadeInUp} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="overflow-hidden h-full hover:shadow-xl transition-all group">
                        <div className="relative h-40 overflow-hidden">
                          <img src={post.image} alt={t(post.titleKey)} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full">{t(post.categoryKey)}</div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{t(post.dateKey)}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{t(post.readTimeKey)}</span>
                          </div>
                          <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{t(post.titleKey)}</h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t(post.excerptKey)}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3" />{t(post.authorKey)}
                            </span>
                            <a 
                              href={post.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                            >
                              {t('blog.readMore')} <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Load More */}
              {visiblePosts < blogPosts.length && (<div className="mt-8 text-center"><Button onClick={() => setVisiblePosts(prev => prev + 3)} variant="outline">{t('blog.loadMore')}</Button></div>)}
            </main>
          </motion.div>
        ) : (
          // Single Post View
          <motion.div key="post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
              <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0"><img src={currentPost?.image} alt={currentPost ? t(currentPost.titleKey) : ''} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /></motion.div>
              <div className="absolute bottom-0 left-0 right-0 z-10"><div className="container mx-auto px-4 pb-12"><button onClick={goBackToList} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"><ArrowLeft className="h-4 w-4" />{t('blog.backToBlog')}</button><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><div className="flex items-center gap-3 text-white/80 text-sm mb-3"><span className="bg-primary px-2 py-0.5 rounded-full text-white text-xs font-bold">{currentPost ? t(currentPost.categoryKey) : ''}</span><span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{currentPost ? t(currentPost.dateKey) : ''}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{currentPost ? t(currentPost.readTimeKey) : ''}</span></div><h1 className="font-heading text-3xl md:text-4xl font-bold text-white max-w-3xl">{currentPost ? t(currentPost.titleKey) : ''}</h1></motion.div></div></div>
            </header>
            <main className="container mx-auto px-4 py-12 max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt={currentPost ? t(currentPost.authorKey) : ''} className="w-10 h-10 rounded-full" />
                <div><p className="font-semibold">{currentPost ? t(currentPost.authorKey) : ''}</p><p className="text-xs text-muted-foreground">{t('blog.author')}</p></div>
              </div>
              <div className="prose dark:prose-invert mb-8">
                <p>{currentPost ? t(currentPost.contentKey || 'posts.0.content') : ''}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8"><Tag className="h-4 w-4 text-muted-foreground" />{currentPost && getArrayFromKey(currentPost.tagsKey).map(tag => (<span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs">{tag}</span>))}</div>
              <div className="border-t pt-6 flex justify-between">
                <Button variant="outline" size="sm" onClick={goBackToList}>← {t('blog.backToBlog')}</Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Bookmark className="h-4 w-4" /></Button>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              onClick={closePackageModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
            >
              <motion.div 
                className="w-11/12 max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl pointer-events-auto"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 20, delay: 0.1 }}
              >
                <Card className="relative bg-gradient-to-br from-background to-background/95 border-2 shadow-2xl rounded-3xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/20 to-transparent" />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border shadow-lg"
                    onClick={closePackageModal}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="relative h-48 overflow-hidden">
                    <img src={selectedPackage.thumbnail} alt={t(selectedPackage.titleKey)} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-6"
                    >
                      <Badge className="mb-2 bg-primary/90 text-white border-0 text-sm font-light tracking-wider">{t(selectedPackage.regionKey)}</Badge>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{t(selectedPackage.titleKey)}</h2>
                    </motion.div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* Price and Quick Info */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-primary/20"
                    >
                      <div>
                        <p className="text-sm font-light text-muted-foreground">{t('packages.startingFrom')}</p>
                        <p className="text-4xl font-bold text-primary font-heading">{t(selectedPackage.priceKey)}</p>
                        <p className="text-xs font-light text-muted-foreground">{t(selectedPackage.basisKey)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedPackage.dates.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-light border-primary/30">
                            {date}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>

                    {/* Highlights */}
                    {selectedPackage.highlightsKey && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" /> 
                          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{t('packages.tourHighlights')}</span>
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {getArrayFromKey(selectedPackage.highlightsKey).map((highlight, index) => (
                            <motion.div 
                              key={index}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 + (index * 0.05) }}
                              className="flex items-start gap-2 text-sm p-2 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="font-light">{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Itinerary */}
                    {selectedPackage.itineraryKey && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                          <Compass className="h-5 w-5 text-primary" />
                          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{t('packages.dailyItinerary')}</span>
                        </h3>
                        <div className="space-y-2">
                          {getArrayFromKey(selectedPackage.itineraryKey).map((day, index) => (
                            <motion.div 
                              key={index}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + (index * 0.03) }}
                              className="flex gap-3 text-sm p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-bold text-primary shrink-0 w-16">{day.split(':')[0]}</span>
                              <span className="font-light">{day.split(':')[1] || day}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Inclusions */}
                    {selectedPackage.inclusionsKey && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-xl"
                      >
                        <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                          <Gift className="h-5 w-5 text-primary" />
                          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{t('packages.whatsIncluded')}</span>
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {getArrayFromKey(selectedPackage.inclusionsKey).map((item, index) => (
                            <motion.div 
                              key={index}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.6 + (index * 0.02) }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-green-500 shrink-0" />
                              <span className="font-light">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Additional Details */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {selectedPackage.accommodationKey && (
                        <div className="text-center p-2">
                          <Hotel className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-xs font-light">{t('packages.additionalDetails.hotel')}</p>
                          <p className="text-xs font-medium line-clamp-2">{t(selectedPackage.accommodationKey)}</p>
                        </div>
                      )}
                      {selectedPackage.bestTimeKey && (
                        <div className="text-center p-2">
                          <Sun className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-xs font-light">{t('packages.additionalDetails.bestTime')}</p>
                          <p className="text-xs font-medium">{t(selectedPackage.bestTimeKey)}</p>
                        </div>
                      )}
                      {selectedPackage.groupSizeKey && (
                        <div className="text-center p-2">
                          <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-xs font-light">{t('packages.additionalDetails.groupSize')}</p>
                          <p className="text-xs font-medium">{t(selectedPackage.groupSizeKey)}</p>
                        </div>
                      )}
                    </motion.div>

                    {/* Single Book Now Button */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="pt-4 border-t border-primary/20"
                    >
                      <Button 
                        onClick={handleBookNow}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg py-6 text-lg"
                        size="lg"
                      >
                        <Wallet className="h-5 w-5 mr-2" />
                        {t('packages.bookNow')}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}