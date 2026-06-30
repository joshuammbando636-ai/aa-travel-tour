import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieConsent() {
  const { t, i18n } = useTranslation('cookie');
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const savedSettings = JSON.parse(consent);
        setSettings(savedSettings);
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setSettings(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setSettings(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
    setShowSettings(false);
  };

  const saveSettings = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSettingChange = (key: keyof Omit<CookieSettings, 'necessary'>) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-5xl">
          {!showSettings ? (
            // Simple consent banner - COMPACT VERSION
            <motion.div
              layout
              className="rounded-xl border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden"
            >
              <div className="relative p-3 md:p-4">
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Cookie className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-heading text-sm font-bold mb-1">
                      {t('banner.title')}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 max-w-2xl">
                      {t('banner.message')}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        onClick={acceptAll}
                        size="sm"
                        className="font-heading h-7 text-xs px-3"
                      >
                        {t('buttons.acceptAll')}
                      </Button>
                      <Button
                        onClick={acceptNecessary}
                        size="sm"
                        variant="outline"
                        className="font-heading h-7 text-xs px-3"
                      >
                        {t('buttons.necessary')}
                      </Button>
                      <Button
                        onClick={() => setShowSettings(true)}
                        size="sm"
                        variant="ghost"
                        className="font-heading gap-1 h-7 text-xs px-3"
                      >
                        <Settings className="h-3 w-3" />
                        {t('buttons.customize')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Detailed settings panel - COMPACT VERSION
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden"
            >
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <h3 className="font-heading text-base font-bold">
                      {t('settings.title')}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="rounded-full p-1 hover:bg-muted transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  {t('settings.message')}
                </p>

                <div className="space-y-2 mb-4">
                  {/* Necessary Cookies - Always enabled */}
                  <div className="flex items-start justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{t('settings.necessary.title')}</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {t('settings.necessary.always')}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {t('settings.necessary.description')}
                      </p>
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        checked={settings.necessary}
                        disabled
                        className="rounded border-primary/30 text-primary h-3 w-3"
                      />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <span className="text-xs font-medium">{t('settings.analytics.title')}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {t('settings.analytics.description')}
                      </p>
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        checked={settings.analytics}
                        onChange={() => handleSettingChange('analytics')}
                        className="rounded border-primary/30 text-primary h-3 w-3"
                      />
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <span className="text-xs font-medium">{t('settings.marketing.title')}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {t('settings.marketing.description')}
                      </p>
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        checked={settings.marketing}
                        onChange={() => handleSettingChange('marketing')}
                        className="rounded border-primary/30 text-primary h-3 w-3"
                      />
                    </div>
                  </div>

                  {/* Preferences Cookies */}
                  <div className="flex items-start justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <span className="text-xs font-medium">{t('settings.preferences.title')}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {t('settings.preferences.description')}
                      </p>
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        checked={settings.preferences}
                        onChange={() => handleSettingChange('preferences')}
                        className="rounded border-primary/30 text-primary h-3 w-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    onClick={acceptAll}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-3"
                  >
                    {t('buttons.acceptAll')}
                  </Button>
                  <Button
                    onClick={saveSettings}
                    size="sm"
                    className="font-heading h-7 text-xs px-3"
                  >
                    {t('buttons.save')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}