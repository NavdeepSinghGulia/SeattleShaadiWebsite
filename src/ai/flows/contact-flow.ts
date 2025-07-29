
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

const ContactFormInputSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  eventDate: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    category: z.string().optional(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function submitContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const categorizationPrompt = ai.definePrompt({
    name: 'categorizeContactMessage',
    input: { schema: z.object({ message: z.string() }) },
    output: { schema: z.object({ category: z.string().describe('The category of the message.') }) },
    prompt: `Categorize the following contact message into one of these categories: Venue Inquiry, Catering Question, Decor Inquiry, General Feedback, Other.

    Message: {{{message}}}`,
});

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    console.log('Received contact form submission:', input);
    
    // Use AI to categorize the message
    const { output } = await categorizationPrompt({ message: input.message });
    const category = output?.category || 'Other';

    console.log(`Message categorized as: ${category}`);

    // Here you would typically send an email, save to a database, etc.
    // including the new category.
    // For this example, we'll just simulate a success response.
    return {
        success: true,
        message: "Thanks for reaching out! We'll get back to you soon.",
        category: category,
    };
  }
);
