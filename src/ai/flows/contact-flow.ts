
'use server';
/**
 * @fileOverview A contact form submission flow.
 *
 * - submitContactForm - A function that handles the contact form submission.
 * - ContactFormInput - The input type for the submitContactForm function.
 * - ContactFormOutput - The return type for the submitContactForm function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  eventDate: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const ContactFormOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function submitContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    console.log('Received contact form submission:', input);
    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just simulate a success response.
    return {
        success: true,
        message: "Thanks for reaching out! We'll get back to you soon.",
    };
  }
);
