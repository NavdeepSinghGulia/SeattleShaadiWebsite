import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';
import ContactPageClient from './contact-client';

export const metadata: Metadata = generateMetadata({
  title: "Contact Us - Seattle Shaadi",
  description: "Get in touch with Seattle's premier wedding planners. Contact us for a consultation about your South Asian or Indian wedding in Seattle. Professional wedding planning services.",
  pathname: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
