'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { type ContactFormInput, submitContactForm } from '@/ai/flows/contact-flow';
import { Loader2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { z } from 'zod';
import { RoyalBackground } from '@/components/royal-background';
import { RoyalTypography } from '@/components/royal-typography';
import { LuxuryCard } from '@/components/luxury-card';
import { InteractiveCtaButton } from '@/components/interactive-cta-button';
import { AnimatedDiv } from '@/components/animated-div';
import { motion } from 'framer-motion';
import { Seo } from "@/components/seo";
import { trackEvent } from '@/lib/analytics';
import Script from 'next/script';
import { siteConfig } from '@/lib/utils';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(14, { message: 'Phone number must be 10 digits.' }), // (123) 456-7890 is 14 chars
  eventDate: z.string().optional(),
  estimatedGuests: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": siteConfig.name,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Wedding Lane",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101",
    "addressCountry": "US"
  },
  "telephone": "+1-206-821-6764",
  "email": "hello@seattleshaadi.com",
  "url": `${siteConfig.url}/contact`,
  "openingHours": "Mo-Fr 10:00-18:00",
  "image": `${siteConfig.url}/Logo-new.webp`,
  "priceRange": "$$$$"
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      estimatedGuests: '',
      budget: '',
      message: '',
    },
  });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (input.length > 10) {
      return; // Don't allow more than 10 digits
    }

    let formattedInput = '';
    if (input.length > 0) {
      formattedInput = '(' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 10);
    }
    
    fieldChange(formattedInput);
  };

  async function onSubmit(values: ContactFormInput) {
    setIsSubmitting(true);
    trackEvent('contact_form_submit', { method: 'web_form' });
    const result = await submitContactForm({
        ...values,
        phone: values.phone.replace(/\D/g, ''), // Send raw digits to backend
    });
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: result.message,
      });
      form.reset();
      trackEvent('contact_form_success', { category: result.category });
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
      trackEvent('contact_form_error', { error_message: result.message });
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Seo
        title="Contact Us - Seattle Shaadi"
        description="Get in touch with Seattle's premier wedding planners. Fill out our form to get a royal quote for your dream wedding or find our contact details."
        pathname="/contact"
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="relative min-h-screen">
        <RoyalBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <AnimatedDiv animation="royalEntrance">
            <div className="text-center">
              <RoyalTypography
                variant="h1"
                animation="crownTitle"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              >
                Let's Create Magic Together
              </RoyalTypography>
              <RoyalTypography
                variant="p"
                animation="royalReveal"
                className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground"
                delay={0.5}
              >
                Have a question or ready to start planning your dream wedding? Fill out the form below or reach out to us directly. We can't wait to hear your story.
              </RoyalTypography>
            </div>
          </AnimatedDiv>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <AnimatedDiv delay={300} animation="fadeInScale" className="hidden lg:block">
              <LuxuryCard variant="royal" className="p-8" glowEffect>
                <RoyalTypography
                  variant="h2"
                  animation="goldenGlow"
                  className="text-2xl md:text-3xl font-bold mb-8 text-center"
                >
                  Contact Information
                </RoyalTypography>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-muted-foreground">123 Wedding Lane, Seattle, WA 98101, USA</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+12068216764" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => trackEvent('contact_click', { type: 'phone' })}>
                        +1 (206) 821-6764
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:hello@seattleshaadi.com" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => trackEvent('contact_click', { type: 'email' })}>
                        hello@seattleshaadi.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-muted-foreground">Mon - Fri, 10am - 6pm</p>
                    </div>
                  </motion.div>
                </div>
              </LuxuryCard>
            </AnimatedDiv>
            <AnimatedDiv delay={600} animation="fadeInScale">
              <LuxuryCard variant="elegant" className="p-8" glowEffect>
                <RoyalTypography
                  variant="h2"
                  animation="goldenGlow"
                  className="text-2xl md:text-3xl font-bold mb-8 text-center"
                  delay={0.8}
                >
                  Get Your Royal Quote
                </RoyalTypography>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        {...field} 
                        onChange={(e) => handlePhoneChange(e, field.onChange)}
                        className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Prospective Event Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="estimatedGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Estimated Guests</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 150" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Budget Range</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $50,000 - $75,000" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Tell Us About Your Vision</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Describe your dream wedding..." {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                    <InteractiveCtaButton 
                      type="submit" 
                      variant="royal" 
                      size="lg" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? 'Sending Your Royal Request...' : 'Send Royal Message'}
                    </InteractiveCtaButton>
                  </form>
                </Form>
              </LuxuryCard>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </>
  );
}
