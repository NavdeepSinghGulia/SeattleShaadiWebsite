
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
import { Resend } from 'resend';

const ContactFormInputSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
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
    console.log('New contact form submission received. Processing...');

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Use AI to categorize the message
    const { output } = await categorizationPrompt({ message: input.message });
    const category = output?.category || 'Other';

    // In a production app, you would save this data to a database (like Firebase Firestore).
    console.log('---------- NEW CONTACT SUBMISSION ----------');
    console.log(`Name: ${input.name}`);
    console.log(`Email: ${input.email}`);
    console.log(`Phone: ${input.phone}`);
    console.log(`Event Date: ${input.eventDate || 'Not provided'}`);
    console.log(`Message: ${input.message}`);
    console.log(`Categorized as: ${category}`);
    console.log('-------------------------------------------');

    try {
      await resend.emails.send({
        from: 'Seattle Shaadi <onboarding@resend.dev>',
        to: 'navdeep.code@gmail.com', // IMPORTANT: Change this to your email address
        subject: `New Contact Form Submission - ${category}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Phone:</strong> ${input.phone}</p>
          <p><strong>Event Date:</strong> ${input.eventDate || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
          <p><em>This message was categorized as: ${category}</em></p>
        `,
      });

      return {
          success: true,
          message: "Thanks for reaching out! We'll get back to you soon.",
          category: category,
      };
    } catch (error) {
        console.error("Failed to send email", error);
        return {
            success: false,
            message: "Sorry, we couldn't send your message. Please try again later.",
        };
    }
  }
);
