
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { type ContactFormInput, submitContactForm } from '@/ai/flows/contact-flow';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  eventDate: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      eventDate: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setIsSubmitting(true);
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Let's Create Magic Together</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have a question or ready to start planning your dream wedding? Fill out the form below or reach out to us directly. We can't wait to hear your story.
        </p>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="bg-secondary/50 p-8 rounded-lg">
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4 text-base md:text-lg">
            <p><strong>Address:</strong> 123 Wedding Lane, Seattle, WA 98101, USA</p>
            <p><strong>Phone:</strong> <a href="tel:+12065550100" className="hover:text-primary">+1 (206) 555-0100</a></p>
            <p><strong>Email:</strong> <a href="mailto:hello@seattleshaadi.com" className="hover:text-primary">hello@seattleshaadi.com</a></p>
            <p><strong>Hours:</strong> Mon - Fri, 10am - 6pm</p>
          </div>
        </div>
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
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
