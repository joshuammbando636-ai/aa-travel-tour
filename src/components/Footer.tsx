import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('quickLinks.home'), to: "/" },
    { label: t('quickLinks.airTicketing'), to: "/air-ticketing" },
    { label: t('quickLinks.safari'), to: "/explorer" },
    { label: t('quickLinks.cmt'), to: "/corporate" },
    { label: t('quickLinks.visa'), to: "/visa" },
    { label: t('quickLinks.about'), to: "/about" },
    { label: t('quickLinks.contact'), to: "/contact" },
  ];

  return (
    <footer className="border-t bg-card" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand - Left */}
          <div className={`${i18n.language === "ar" ? "text-right" : "text-left"}`}>
            <h3 className="font-heading text-lg font-bold">
              {t('brand.title').split('&')[0]} <span className="text-primary">&</span> {t('brand.title').split('&')[1]}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              {t('brand.description')}
            </p>
            <p className="mt-4 font-heading text-lg italic text-primary">
              {t('brand.welcome')}
            </p>
          </div>

          {/* Quick Links - Center */}
          <div className="text-center">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
              {t('quickLinks.title')}
            </h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us - Right */}
          <div className={`${i18n.language === "ar" ? "text-left" : "text-right"}`}>
            <div className={`flex items-center ${i18n.language === "ar" ? "justify-start" : "justify-end"} gap-2`}>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('follow.title')}
              </h4>
              <a
                href="https://www.instagram.com/aatraveltz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}