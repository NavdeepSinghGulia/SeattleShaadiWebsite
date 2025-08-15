import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMetadata } from "@/lib/seo-config";
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = generateMetadata({
  title: "Careers - Join Our Wedding Planning Team",
  description: "Join Seattle Shaadi's passionate team of wedding planners. Explore career opportunities in wedding planning, design, and client services. Help create magical South Asian weddings in Seattle.",
  pathname: "/carriers",
});

export default function LegacyCareersRedirect() {
  redirect('/careers');
}
