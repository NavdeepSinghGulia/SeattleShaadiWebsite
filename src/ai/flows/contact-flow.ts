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
import { reportError } from '@/lib/error-reporting';
import { contactFormSchema, type ContactFormData } from '@/lib/form-validation';

// Simple in-memory rate limiting (in production, use Redis or database)
const submissionTracker = new Map<string, { count: number; lastSubmission: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Use the simplified contact form schema
export type ContactFormInput = ContactFormData;

const _ContactFormOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    category: z.string().optional(),
});
export type ContactFormOutput = z.infer<typeof _ContactFormOutputSchema>;

// Security utility functions
function sanitizeHtml(input: string): string {
  return input
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, ' ') // Normalize internal whitespace
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\x00-\x1f\x7f-\x9f/g, '') // Remove control characters
    .substring(0, 1000); // Reasonable length limit
}

function validateInput(input: ContactFormInput): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Use the comprehensive validation from form-validation.ts
  const validationResult = contactFormSchema.safeParse(input);
  if (!validationResult.success) {
    validationResult.error.errors.forEach(err => {
      errors.push(err.message);
    });
  }
  
  // Additional security validations
  const firstName = input.firstName || '';
  const lastName = input.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  
  if (fullName.length > 100) errors.push('Name too long');
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
  
  const allText = `${fullName} ${input.email} ${input.message}`;
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
  if (process.env.NODE_ENV === 'development') {
    console.log('New contact form submission received. Processing...');
  }

  // Check rate limiting first
  const rateLimitCheck = checkRateLimit(input.email);
  if (!rateLimitCheck.allowed) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Rate limit exceeded for email: ${input.email}`);
    }
    return {
      success: false,
      message: rateLimitCheck.message || "Too many requests. Please try again later.",
    };
  }

  // Validate and sanitize input
  const validation = validateInput(input);
  if (!validation.isValid) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Invalid input detected:', validation.errors);
    }
    return {
      success: false,
      message: "Invalid input detected. Please check your submission.",
    };
  }

  // Validate environment variables
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.error('RESEND_API_KEY not configured');
    }
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

  // Sanitize all inputs for logging and email with length limits
  const sanitizedInput = {
    name: sanitizeHtml(input.name).substring(0, 100),
    email: sanitizeHtml(input.email).substring(0, 100),
    phone: sanitizeHtml(input.phone).substring(0, 20),
    eventDate: input.eventDate ? sanitizeHtml(input.eventDate).substring(0, 50) : 'Not provided',
    guestCount: input.guestCount ? sanitizeHtml(input.guestCount).substring(0, 20) : 'Not provided',
    budget: input.budget ? sanitizeHtml(input.budget).substring(0, 50) : 'Not provided',
    message: sanitizeHtml(input.message).substring(0, 2000),
  };

  // In a production app, you would save this data to a database (like Firebase Firestore).
  if (process.env.NODE_ENV === 'development') {
    console.log('---------- NEW CONTACT SUBMISSION ----------');
    console.log(`Name: ${sanitizedInput.name}`);
    console.log(`Email: ${sanitizedInput.email}`);
    console.log(`Phone: ${sanitizedInput.phone}`);
    console.log(`Event Date: ${sanitizedInput.eventDate}`);
    console.log(`Guest Count: ${sanitizedInput.guestCount}`);
    console.log(`Budget: ${sanitizedInput.budget}`);
    console.log(`Message: ${sanitizedInput.message}`);
    console.log(`Categorized as: ${category}`);
    console.log('-------------------------------------------');
  }

  try {
    // Get recipient email from environment variable for security
    const recipientEmail = process.env.CONTACT_EMAIL || 'navdeep.code@gmail.com';
    
    await resend.emails.send({
      from: 'Seattle Shaadi <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Contact Form Submission - ${category}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 10px;">New Contact Form Submission</h1>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${sanitizedInput.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedInput.email}">${sanitizedInput.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${sanitizedInput.phone}">${sanitizedInput.phone}</a></p>
          </div>

          <div style="background-color: #fef3f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Event Details</h2>
            <p><strong>Event Date:</strong> ${sanitizedInput.eventDate}</p>
            <p><strong>Guest Count:</strong> ${sanitizedInput.guestCount}</p>
            <p><strong>Budget:</strong> ${sanitizedInput.budget}</p>
          </div>

          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Message</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedInput.message}</p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-style: italic;">This message was categorized as: ${category}</p>
            <p style="color: #9ca3af; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    return {
        success: true,
        message: "Thanks for reaching out! We'll get back to you soon.",
        category: category,
    };
  } catch (error) {
      // Report error to error reporting service
      reportError(error as Error, {
        component: 'ContactFlow',
        action: 'send_email',
        metadata: {
          email: sanitizedInput.email,
          category: category
        }
      });

      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to send email", error);
      }
      return {
          success: false,
          message: "Sorry, we couldn't send your message. Please try again later.",
      };
  }
}
