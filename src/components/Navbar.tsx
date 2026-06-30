import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// Define navigation with their translation keys
const navLinks = [
  { label: "Home", to: "/", key: "nav_home" },
  { label: "Air Ticketing", to: "/air-ticketing", key: "nav_air" },
  { label: "CMT", to: "/corporate", key: "nav_cmt" },
  { label: "Visa", to: "/visa", key: "nav_visa" },
  { label: "About Us", to: "/about", key: "nav_about" },
  { label: "Contact", to: "/contact", key: "nav_contact" },
];

const explorerLinks = [
  { label: "Safari Destination", to: "/explorer", key: "nav_safari" },
  { label: "Wildlife Calendar", to: "/wildlife-Calendar", key: "nav_calendar" },
  { label: "Eco Calculator", to: "/eco-calculator", key: "nav_eco" },
  { label: "Blog", to: "/blog", key: "nav_blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [languageOpen, setLanguageOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const languageTimeoutRef = useRef(null);

  const { isDark, toggle } = useTheme();
  const { t, i18n } = useTranslation('common');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } 
      else if (currentScrollY < 100) {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExplorerOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExplorerOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExplorerOpen(false);
    }, 150);
  };

  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current) {
      clearTimeout(languageTimeoutRef.current);
      languageTimeoutRef.current = null;
    }
    setLanguageOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setLanguageOpen(false);
    }, 150);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (languageTimeoutRef.current) {
        clearTimeout(languageTimeoutRef.current);
      }
    };
  }, []);

  // Get current language display name
  const getCurrentLanguage = () => {
    switch(i18n.language) {
      case 'ar': return 'العربية';
      case 'fr': return 'Français';
      case 'es': return 'Español';
      default: return 'English';
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        "h-16 sm:h-20 md:h-24",
        visible ? "top-0 opacity-100" : "-top-24 opacity-0",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/95 backdrop-blur-md shadow-md"
      )}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-4 h-full">
        
        {/* Logo with text */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 h-full max-w-[50%] sm:max-w-full">
          <img
            src="/images/cars/AA.png"
            alt="AA Travel & Tours Logo"
            className="h-full max-h-12 sm:max-h-16 md:max-h-20 lg:max-h-24 w-auto transition-transform duration-500 hover:scale-105 object-contain"
          />
          <span
            className={cn(
              "font-heading font-bold tracking-tight whitespace-nowrap transition-colors duration-300",
              "text-sm sm:text-base md:text-lg lg:text-xl",
              "text-foreground"
            )}
          >
            AA TRAVEL<span className="text-primary"> & </span> TOURS LTD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">

          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-md px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-300 relative group",
                "text-foreground hover:text-primary",
                location.pathname === link.to && "text-primary"
              )}
            >
              <span className="relative inline-block">
                {t(link.key)}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full",
                  location.pathname === link.to ? "w-full" : "w-0"
                )} />
              </span>
            </Link>
          ))}

          {/* Explorer Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={triggerRef}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-300 relative group",
                "text-foreground hover:text-primary",
                explorerOpen && "text-primary"
              )}
            >
              <span className="relative inline-block">
                {t('nav_explorer')}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full",
                  explorerOpen ? "w-full" : "w-0"
                )} />
              </span>
              <ChevronDown 
                size={14} 
                className={cn(
                  "transition-transform duration-500",
                  explorerOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "absolute top-full left-0 mt-2 w-48 xl:w-56 rounded-md bg-background shadow-lg border p-2 transition-all duration-500 origin-top",
                explorerOpen 
                  ? "opacity-100 scale-100 visible" 
                  : "opacity-0 scale-95 invisible pointer-events-none"
              )}
            >
              <div className="space-y-1">
                {explorerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "block rounded-md px-3 py-2 text-xs xl:text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted hover:text-primary",
                      location.pathname === link.to && "text-primary bg-muted/50"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-md px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-300 relative group",
                "text-foreground hover:text-primary",
                location.pathname === link.to && "text-primary"
              )}
            >
              <span className="relative inline-block">
                {t(link.key)}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full",
                  location.pathname === link.to ? "w-full" : "w-0"
                )} />
              </span>
            </Link>
          ))}

          {/* Language Switcher Dropdown */}
          <div
            className="relative"
            ref={languageDropdownRef}
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            <button
              className={cn(
                "flex items-center gap-1 rounded-md px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-300",
                "text-foreground hover:text-primary border border-border/50 hover:border-primary/50",
                languageOpen && "text-primary border-primary/50"
              )}
            >
              <Globe size={14} />
              <span>{getCurrentLanguage()}</span>
              <ChevronDown 
                size={14} 
                className={cn(
                  "transition-transform duration-500",
                  languageOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "absolute top-full right-0 mt-2 w-32 rounded-md bg-background shadow-lg border p-1 transition-all duration-500 origin-top",
                languageOpen 
                  ? "opacity-100 scale-100 visible" 
                  : "opacity-0 scale-95 invisible pointer-events-none"
              )}
            >
              <button
                onClick={() => changeLanguage('en')}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-muted hover:text-primary",
                  i18n.language === 'en' && "bg-primary/10 text-primary font-medium"
                )}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-muted hover:text-primary",
                  i18n.language === 'ar' && "bg-primary/10 text-primary font-medium"
                )}
              >
                العربية
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-muted hover:text-primary",
                  i18n.language === 'fr' && "bg-primary/10 text-primary font-medium"
                )}
              >
                Français
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-muted hover:text-primary",
                  i18n.language === 'es' && "bg-primary/10 text-primary font-medium"
                )}
              >
                Español
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={cn(
              "ml-1 xl:ml-2 rounded-full p-1.5 transition-all duration-500 hover:scale-110 hover:rotate-12 hover:bg-muted",
              "text-foreground"
            )}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Book Button */}
          <Link to="/contact">
            <Button size="sm" className="font-heading font-semibold px-3 xl:px-4 text-xs xl:text-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-primary/90">
              {t('nav_book')}
            </Button>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
          {/* Mobile Language Button */}
          <button 
            onClick={() => setLanguageOpen(!languageOpen)} 
            className="p-1 transition-all duration-500 hover:scale-110 text-foreground border border-border/50 rounded-md"
          >
            <Globe size={16} />
          </button>

          <button onClick={toggle} className="p-1 transition-all duration-500 hover:scale-110 hover:rotate-12 text-foreground">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 transition-all duration-500 hover:scale-110 text-foreground">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 pb-4 lg:hidden transition-all duration-500 ease-in-out">
          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:translate-x-3 hover:bg-muted hover:text-primary"
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Mobile Explorer */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileExplorerOpen(!mobileExplorerOpen)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:translate-x-3 hover:bg-muted"
              >
                {t('nav_explorer')}
                <ChevronDown 
                  size={16} 
                  className={cn(
                    "transition-transform duration-500",
                    mobileExplorerOpen && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "ml-4 space-y-1 overflow-hidden transition-all duration-500",
                  mobileExplorerOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                {explorerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block rounded-md px-3 py-2 text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted hover:text-primary"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Language Options */}
            {languageOpen && (
              <div className="space-y-1 border-t border-border/50 mt-2 pt-2">
                <p className="px-3 py-1 text-xs font-medium text-muted-foreground">Language</p>
                <button
                  onClick={() => changeLanguage('en')}
                  className={cn(
                    "w-full text-left rounded-md px-3 py-2 text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted",
                    i18n.language === 'en' && "text-primary bg-muted/50"
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={cn(
                    "w-full text-left rounded-md px-3 py-2 text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted",
                    i18n.language === 'ar' && "text-primary bg-muted/50"
                  )}
                >
                  العربية
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={cn(
                    "w-full text-left rounded-md px-3 py-2 text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted",
                    i18n.language === 'fr' && "text-primary bg-muted/50"
                  )}
                >
                  Français
                </button>
                <button
                  onClick={() => changeLanguage('es')}
                  className={cn(
                    "w-full text-left rounded-md px-3 py-2 text-sm transition-all duration-300 hover:translate-x-3 hover:bg-muted",
                    i18n.language === 'es' && "text-primary bg-muted/50"
                  )}
                >
                  Español
                </button>
              </div>
            )}

            <Link to="/contact" className="mt-3 block">
              <Button size="sm" className="w-full font-heading font-semibold transition-all duration-500 hover:scale-105 hover:bg-primary/90">
                {t('nav_book')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}