import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email is too long');

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(
    /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
    'Please enter a valid phone number (e.g., (555) 123-4567)'
  );

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const dateSchema = z
  .string()
  .min(1, 'Date is required')
  .refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Date must be in the future');

export const budgetSchema = z
  .number()
  .min(5000, 'Minimum budget is $5,000')
  .max(500000, 'Maximum budget is $500,000');

export const guestCountSchema = z
  .number()
  .min(10, 'Minimum guest count is 10')
  .max(2000, 'Maximum guest count is 2000');

// Contact form schema
export const contactFormSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  weddingDate: dateSchema.optional(),
  budget: z.string().min(1, 'Budget range is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  weddingType: z.string().min(1, 'Wedding type is required'),
  venue: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  preferredContact: z.enum(['email', 'phone', 'either'], {
    required_error: 'Please select a preferred contact method',
  }),
  newsletter: z.boolean().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Consultation booking schema
export const consultationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  weddingDate: dateSchema,
  budget: budgetSchema,
  guestCount: guestCountSchema,
  weddingType: z.enum([
    'hindu',
    'sikh',
    'punjabi',
    'tamil',
    'telugu',
    'kannada',
    'muslim',
    'bengali',
    'gujarati',
    'marathi',
    'other'
  ], {
    required_error: 'Please select your wedding type',
  }),
  preferredDate: z.string().min(1, 'Preferred consultation date is required'),
  preferredTime: z.string().min(1, 'Preferred consultation time is required'),
  specificRequirements: z.string().max(500, 'Requirements must be less than 500 characters').optional(),
  hearAboutUs: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Vendor inquiry schema
export const vendorInquirySchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100, 'Business name is too long'),
  contactName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  serviceType: z.string().min(1, 'Service type is required'),
  experience: z.string().min(1, 'Experience level is required'),
  coverage: z.string().min(1, 'Service coverage area is required'),
  pricing: z.string().min(1, 'Pricing information is required'),
  portfolio: z.string().url('Please enter a valid portfolio URL').optional().or(z.literal('')),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  references: z.string().optional(),
  insurance: z.boolean(),
  license: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: nameSchema.optional(),
  interests: z.array(z.string()).optional(),
  frequency: z.enum(['weekly', 'monthly', 'special']).optional(),
});

// Review submission schema
export const reviewSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(5, 'Review title must be at least 5 characters').max(100, 'Title is too long'),
  review: z
    .string()
    .min(20, 'Review must be at least 20 characters')
    .max(1000, 'Review must be less than 1000 characters'),
  weddingDate: dateSchema.optional(),
  weddingType: z.string().optional(),
  wouldRecommend: z.boolean(),
  allowPublic: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Quote request schema
export const quoteRequestSchema = z.object({
  // Personal Information
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  
  // Wedding Details
  weddingDate: dateSchema,
  backupDate: dateSchema.optional(),
  weddingType: z.string().min(1, 'Wedding type is required'),
  guestCount: guestCountSchema,
  budget: budgetSchema,
  
  // Venue Information
  ceremonyVenue: z.string().optional(),
  receptionVenue: z.string().optional(),
  venueBooked: z.boolean(),
  venueFlexible: z.boolean(),
  
  // Services Required
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  fullPlanning: z.boolean(),
  partialPlanning: z.boolean(),
  dayOfCoordination: z.boolean(),
  
  // Additional Details
  specialRequirements: z.string().max(1000, 'Requirements must be less than 1000 characters').optional(),
  timeline: z.string().min(1, 'Planning timeline is required'),
  previousPlanner: z.boolean(),
  referralSource: z.string().optional(),
  
  // Agreement
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ConsultationData = z.infer<typeof consultationSchema>;
export type VendorInquiryData = z.infer<typeof vendorInquirySchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

// Validation helper functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
};

// Field validation for real-time feedback
export const validateField = <T extends Record<string, unknown>>(
  schema: z.ZodObject<z.ZodRawShape>,
  fieldName: string,
  value: unknown,
  data: Partial<T> = {}
): string | null => {
  try {
    // Create a partial object with the field to validate
    const testData = { ...data, [fieldName]: value } as T;
    
    // Try to parse just this field
    const fieldSchema = schema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
    } else {
      // Fallback: validate the entire object and extract field error
      schema.parse(testData);
    }
    
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find(err => 
        err.path.length === 1 && err.path[0] === fieldName
      );
      return fieldError?.message || null;
    }
    return 'Validation error';
  }
};

// Sanitization helpers
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeFormData = <T extends Record<string, unknown>>(data: T): T => {
  const sanitized = { ...data } as Record<string, unknown>;
  
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key] as string);
    }
  });
  
  return sanitized as T;
};

// Form submission rate limiting
const submissionTracker = new Map<string, number[]>();

export const checkRateLimit = (identifier: string, maxSubmissions = 5, windowMs = 60000): boolean => {
  const now = Date.now();
  const submissions = submissionTracker.get(identifier) || [];
  
  // Remove old submissions outside the window
  const recentSubmissions = submissions.filter(time => now - time < windowMs);
  
  if (recentSubmissions.length >= maxSubmissions) {
    return false; // Rate limit exceeded
  }
  
  // Add current submission
  recentSubmissions.push(now);
  submissionTracker.set(identifier, recentSubmissions);
  
  return true; // Within rate limit
};

// Honeypot validation (anti-spam)
export const validateHoneypot = (honeypotValue: string): boolean => {
  return honeypotValue === '' || honeypotValue === undefined;
};

// CSRF token validation
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  return token === sessionToken && token.length > 10;
};
