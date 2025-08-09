'use server';
/**
 * @fileOverview A contact form submission flow.
 *
 * - submitContactForm - A function that handles the contact form submission.
 * - ContactFormInput - The input type for the submitContactForm function.
 * - ContactFormOutput - The return type for the submitContactForm function.
 */

import { z } from 'zod';
import { Resend } from 'resend';

// Simple in-memory rate limiting (in production, use Redis or database)
const submissionTracker = new Map<string, { count: number; lastSubmission: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

const ContactFormInputSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
  eventDate: z.string().optional(),
  estimatedGuests: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    category: z.string().optional(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

// Security utility functions
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function validateInput(input: ContactFormInput): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Additional security validations
  if (input.name.length > 100) errors.push('Name too long');
  if (input.email.length > 254) errors.push('Email too long');
  if (input.message.length > 2000) errors.push('Message too long');
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i
  ];
  
  const allText = `${input.name} ${input.email} ${input.message}`;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push('Invalid characters detected');
      break;
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

function checkRateLimit(email: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const userKey = email.toLowerCase();
  const userSubmissions = submissionTracker.get(userKey);

  if (!userSubmissions) {
    submissionTracker.set(userKey, { count: 1, lastSubmission: now });
    return { allowed: true };
  }

  // Reset counter if window has passed
  if (now - userSubmissions.lastSubmission > RATE_LIMIT_WINDOW) {
    submissionTracker.set(userKey, { count: 1, lastSubmission: now });
    return { allowed: true };
  }

  // Check if user has exceeded rate limit
  if (userSubmissions.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return { 
      allowed: false, 
      message: "Too many submissions. Please wait a minute before trying again." 
    };
  }

  // Increment counter
  userSubmissions.count++;
  userSubmissions.lastSubmission = now;
  return { allowed: true };
}

export async function submitContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  console.log('New contact form submission received. Processing...');

  // Check rate limiting first
  const rateLimitCheck = checkRateLimit(input.email);
  if (!rateLimitCheck.allowed) {
    console.warn(`Rate limit exceeded for email: ${input.email}`);
    return {
      success: false,
      message: rateLimitCheck.message || "Too many requests. Please try again later.",
    };
  }

  // Validate and sanitize input
  const validation = validateInput(input);
  if (!validation.isValid) {
    console.warn('Invalid input detected:', validation.errors);
    return {
      success: false,
      message: "Invalid input detected. Please check your submission.",
    };
  }

  // Validate environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return {
      success: false,
      message: "Service temporarily unavailable. Please try again later.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  // Simple categorization based on keywords (replacing AI categorization for now)
  const message = input.message.toLowerCase();
  let category = 'Other';
  
  if (message.includes('venue') || message.includes('location') || message.includes('place')) {
    category = 'Venue Inquiry';
  } else if (message.includes('food') || message.includes('catering') || message.includes('menu')) {
    category = 'Catering Question';
  } else if (message.includes('decor') || message.includes('decoration') || message.includes('flowers')) {
    category = 'Decor Inquiry';
  } else if (message.includes('feedback') || message.includes('review') || message.includes('experience')) {
    category = 'General Feedback';
  }

  // Sanitize all inputs for logging and email
  const sanitizedInput = {
    name: sanitizeHtml(input.name),
    email: sanitizeHtml(input.email),
    phone: sanitizeHtml(input.phone),
    eventDate: input.eventDate ? sanitizeHtml(input.eventDate) : 'Not provided',
    estimatedGuests: input.estimatedGuests ? sanitizeHtml(input.estimatedGuests) : 'Not provided',
    budget: input.budget ? sanitizeHtml(input.budget) : 'Not provided',
    message: sanitizeHtml(input.message),
  };

  // In a production app, you would save this data to a database (like Firebase Firestore).
  console.log('---------- NEW CONTACT SUBMISSION ----------');
  console.log(`Name: ${sanitizedInput.name}`);
  console.log(`Email: ${sanitizedInput.email}`);
  console.log(`Phone: ${sanitizedInput.phone}`);
  console.log(`Event Date: ${sanitizedInput.eventDate}`);
  console.log(`Estimated Guests: ${sanitizedInput.estimatedGuests}`);
  console.log(`Budget: ${sanitizedInput.budget}`);
  console.log(`Message: ${sanitizedInput.message}`);
  console.log(`Categorized as: ${category}`);
  console.log('-------------------------------------------');

  try {
    // Get recipient email from environment variable for security
    const recipientEmail = process.env.CONTACT_EMAIL || 'navdeep.code@gmail.com';
    
    await resend.emails.send({
      from: 'Seattle Shaadi <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Contact Form Submission - ${category}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizedInput.name}</p>
        <p><strong>Email:</strong> ${sanitizedInput.email}</p>
        <p><strong>Phone:</strong> ${sanitizedInput.phone}</p>
        <p><strong>Event Date:</strong> ${sanitizedInput.eventDate}</p>
        <p><strong>Estimated Guests:</strong> ${sanitizedInput.estimatedGuests}</p>
        <p><strong>Budget:</strong> ${sanitizedInput.budget}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedInput.message}</p>
        <p><em>This message was categorized as: ${category}</em></p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
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
