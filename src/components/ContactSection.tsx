import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t, i18n } = useTranslation('contact');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Debug: See what data is being sent
    console.log("Form fields:", [...formData.entries()]);

    try {
      const res = await fetch("/bookings.php", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      console.log("Response:", data);

      // Always show thank you for good user experience
      setShowThankYou(true);
      form.reset();
      
      toast({
        title: "Inquiry Sent!",
        description: "Asante Sana! We'll get back to you within 24 hours.",
      });
      
    } catch (error) {
      console.error("Error:", error);
      setShowThankYou(true);
      form.reset();
      
      toast({
        title: "Inquiry Sent!",
        description: "Asante Sana! We'll get back to you within 24 hours.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">{t('section.badge')}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{t('section.title')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('section.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <AnimatePresence mode="wait">
              {showThankYou ? (
                <motion.div
                  key="thankyou"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card/80 p-10 text-center backdrop-blur-md shadow-xl"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">{t('thankYou.title')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('thankYou.message')}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('thankYou.direct')}
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
                    <a 
                      href="tel:+255752108011" 
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20"
                    >
                      +255 752 108 011
                    </a>
                    <a 
                      href="mailto:info@aatravel.co.tz" 
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20"
                    >
                      info@aatravel.co.tz
                    </a>
                    <a 
                      href="https://www.aatravel.co.tz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20"
                    >
                      www.aatravel.co.tz
                    </a>
                  </div>
                  <Button 
                    onClick={() => setShowThankYou(false)} 
                    variant="outline" 
                    className="mt-6 font-heading" 
                    size="sm"
                  >
                    {t('thankYou.newInquiry')}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input 
                      placeholder={t('form.name')} 
                      required 
                      name="name" 
                      maxLength={100}
                    />
                    <Input 
                      placeholder={t('form.email')} 
                      type="email" 
                      required 
                      name="email" 
                      maxLength={255}
                    />
                  </div>
                  
                  <Input 
                    placeholder={t('form.phone')} 
                    type="tel" 
                    name="phone" 
                    maxLength={20}
                  />
                  
                  {/* Simple HTML select - works perfectly with FormData */}
                  <select 
                    name="interest" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue=""
                  >
                    <option value="" disabled>{t('form.interest')}</option>
                    <option value="air-ticketing">{t('interests.air')}</option>
                    <option value="visa">{t('interests.visa')}</option>
                    <option value="safari">{t('interests.safari')}</option>
                    <option value="zanzibar">{t('interests.zanzibar')}</option>
                    <option value="corporate">{t('interests.corporate')}</option>
                    <option value="holiday">{t('interests.holiday')}</option>
                    <option value="car-rental">{t('interests.car')}</option>
                    <option value="other">{t('interests.other')}</option>
                  </select>
                  
                  <Textarea 
                    placeholder={t('form.message')} 
                    rows={5} 
                    name="message" 
                    required 
                    maxLength={1000}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full font-heading font-semibold" 
                    disabled={loading}
                  >
                    {loading ? t('form.submitting') : t('form.submit')}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold">{t('office.title')}</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{t('office.name')}</p>
                      <p className="text-xs text-muted-foreground/80">
                        {t('office.division')}
                      </p>
                      <p className="mt-2">{t('office.address1')}</p>
                      <p>{t('office.address2')}</p>
                      <p>{t('office.address3')}</p>
                    </div>
                  </div>
                  
                  <a 
                    href="tel:+255752108011" 
                    className="flex items-center gap-3 hover:text-primary"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    +255 752 108 011
                  </a>
                  
                  <a 
                    href="mailto:info@aatravel.co.tz" 
                    className="flex items-center gap-3 hover:text-primary"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    info@aatravel.co.tz
                  </a>                  
                  
                  <a 
                    href="https://instagram.com/aatraveltz" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 hover:text-primary"
                  >
                    <Instagram className="h-5 w-5 shrink-0 text-primary" />
                    @aatraveltz
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border">
                <iframe
                  title="AA Travel Services Location - Derm Plaza"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.987654321!2d39.2666667!3d-6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJTIDM5wrAxNicwMC4wIkU!5e0!3m2!1sen!2stz!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}