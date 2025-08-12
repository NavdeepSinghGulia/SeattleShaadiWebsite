import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, validateHoneypot, validateCSRFToken } from './form-validation';

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
  message?: string;
  timestamp?: string;
  requestId?: string;
}

// Error types
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(
    message: string,
    public errors: Record<string, string>
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}

// Request validation middleware
export const validateRequest = async (
  request: NextRequest,
  options: {
    method?: string | string[];
    contentType?: string;
    maxBodySize?: number;
    requireAuth?: boolean;
  } = {}
) => {
  const {
    method = 'POST',
    contentType = 'application/json',
    maxBodySize = 1024 * 1024, // 1MB
    requireAuth = false,
  } = options;

  // Method validation
  const allowedMethods = Array.isArray(method) ? method : [method];
  if (!allowedMethods.includes(request.method)) {
    throw new APIError(`Method ${request.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  // Content-Type validation
  const requestContentType = request.headers.get('content-type');
  if (requestContentType && !requestContentType.includes(contentType)) {
    throw new APIError(`Invalid content type. Expected ${contentType}`, 400, 'INVALID_CONTENT_TYPE');
  }

  // Body size validation
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > maxBodySize) {
    throw new APIError('Request body too large', 413, 'PAYLOAD_TOO_LARGE');
  }

  // Auth validation (if required)
  if (requireAuth) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new APIError('Authentication required', 401, 'UNAUTHORIZED');
    }
  }

  return true;
};

// Rate limiting middleware
export const applyRateLimit = (
  request: NextRequest,
  options: {
    maxRequests?: number;
    windowMs?: number;
    keyGenerator?: (req: NextRequest) => string;
  } = {}
) => {
  const {
    maxRequests = 10,
    windowMs = 60000, // 1 minute
    keyGenerator = (req) => req.ip || 'anonymous',
  } = options;

  const identifier = keyGenerator(request);
  
  if (!checkRateLimit(identifier, maxRequests, windowMs)) {
    throw new RateLimitError();
  }

  return true;
};

// CORS middleware
export const applyCORS = (
  response: NextResponse,
  options: {
    origin?: string | string[];
    methods?: string[];
    headers?: string[];
    credentials?: boolean;
  } = {}
) => {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers = ['Content-Type', 'Authorization'],
    credentials = false,
  } = options;

  // Set CORS headers
  if (Array.isArray(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin.join(', '));
  } else {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set('Access-Control-Allow-Methods', methods.join(', '));
  response.headers.set('Access-Control-Allow-Headers', headers.join(', '));
  
  if (credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
};

// Security headers middleware
export const applySecurityHeaders = (response: NextResponse) => {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
};

// Request body parser with validation
export const parseRequestBody = async <T>(
  request: NextRequest,
  schema?: z.ZodSchema<T>
): Promise<T> => {
  try {
    const body = await request.json();
    
    if (schema) {
      const result = schema.safeParse(body);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        throw new ValidationError('Validation failed', errors);
      }
      return result.data;
    }
    
    return body;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new APIError('Invalid JSON body', 400, 'INVALID_JSON');
  }
};

// Anti-spam validation
export const validateAntiSpam = (data: any) => {
  // Check honeypot field
  if (data.honeypot && !validateHoneypot(data.honeypot)) {
    throw new APIError('Spam detected', 400, 'SPAM_DETECTED');
  }

  // Check CSRF token if provided
  if (data.csrfToken && data.sessionToken) {
    if (!validateCSRFToken(data.csrfToken, data.sessionToken)) {
      throw new APIError('Invalid CSRF token', 400, 'INVALID_CSRF');
    }
  }

  // Basic spam detection patterns
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|winner)\b/i,
    /\b(click here|buy now|limited time|act now)\b/i,
    /\b(make money|work from home|guaranteed income)\b/i,
    /(http[s]?:\/\/[^\s]+){3,}/i, // Multiple URLs
  ];

  const textFields = ['message', 'description', 'comment', 'review'];
  
  for (const field of textFields) {
    if (data[field] && typeof data[field] === 'string') {
      const text = data[field].toLowerCase();
      for (const pattern of spamPatterns) {
        if (pattern.test(text)) {
          throw new APIError('Content flagged as spam', 400, 'SPAM_DETECTED');
        }
      }
    }
  }

  return true;
};

// Response formatter
export const createResponse = <T>(
  data?: T,
  options: {
    success?: boolean;
    message?: string;
    statusCode?: number;
    headers?: Record<string, string>;
  } = {}
): NextResponse => {
  const {
    success = true,
    message,
    statusCode = success ? 200 : 400,
    headers = {},
  } = options;

  const response: APIResponse<T> = {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substring(2),
  };

  const nextResponse = NextResponse.json(response, { status: statusCode });
  
  // Apply custom headers
  Object.entries(headers).forEach(([key, value]) => {
    nextResponse.headers.set(key, value);
  });

  return nextResponse;
};

// Error response formatter
export const createErrorResponse = (
  error: Error | APIError | ValidationError,
  statusCode?: number
): NextResponse => {
  let response: APIResponse;
  let status = statusCode || 500;

  if (error instanceof ValidationError) {
    response = {
      success: false,
      error: error.message,
      errors: error.errors,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2),
    };
    status = error.statusCode;
  } else if (error instanceof APIError) {
    response = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2),
    };
    status = error.statusCode;
  } else {
    // Generic error
    response = {
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2),
    };
  }

  return NextResponse.json(response, { status });
};

// API route wrapper with error handling
export const withErrorHandling = (
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) => {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      const response = await handler(request, context);
      
      // Apply security headers to all responses
      return applySecurityHeaders(response);
    } catch (error) {
      console.error('API Error:', error);
      
      // Log error details in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      }

      const errorResponse = createErrorResponse(error as Error);
      return applySecurityHeaders(errorResponse);
    }
  };
};

// Complete API route handler with all middleware
export const createAPIHandler = (
  handler: (request: NextRequest, body: any) => Promise<any>,
  options: {
    schema?: z.ZodSchema<any>;
    rateLimit?: {
      maxRequests?: number;
      windowMs?: number;
    };
    validation?: {
      method?: string | string[];
      contentType?: string;
      maxBodySize?: number;
    };
    cors?: {
      origin?: string | string[];
      methods?: string[];
    };
    antiSpam?: boolean;
  } = {}
) => {
  return withErrorHandling(async (request: NextRequest) => {
    // Apply rate limiting
    if (options.rateLimit) {
      applyRateLimit(request, options.rateLimit);
    }

    // Validate request
    if (options.validation) {
      await validateRequest(request, options.validation);
    }

    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      return options.cors ? applyCORS(response, options.cors) : response;
    }

    // Parse and validate body
    const body = await parseRequestBody(request, options.schema);

    // Anti-spam validation
    if (options.antiSpam) {
      validateAntiSpam(body);
    }

    // Execute handler
    const result = await handler(request, body);

    // Create response
    let response = createResponse(result, {
      message: 'Request processed successfully',
    });

    // Apply CORS if configured
    if (options.cors) {
      response = applyCORS(response, options.cors);
    }

    return response;
  });
};

// Utility for handling file uploads
export const handleFileUpload = async (
  request: NextRequest,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    maxFiles?: number;
  } = {}
) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles = 1,
  } = options;

  try {
    const formData = await request.formData();
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Validate file size
        if (value.size > maxSize) {
          throw new APIError(`File ${value.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`, 400);
        }

        // Validate file type
        if (!allowedTypes.includes(value.type)) {
          throw new APIError(`File type ${value.type} is not allowed`, 400);
        }

        files.push(value);
      }
    }

    // Validate number of files
    if (files.length > maxFiles) {
      throw new APIError(`Too many files. Maximum allowed is ${maxFiles}`, 400);
    }

    return { files, formData };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Failed to process file upload', 400);
  }
};

// Health check endpoint helper
export const createHealthCheck = (checks: Record<string, () => Promise<boolean>> = {}) => {
  return withErrorHandling(async (request: NextRequest) => {
    const results: Record<string, boolean> = {};
    let allHealthy = true;

    // Run all health checks
    for (const [name, check] of Object.entries(checks)) {
      try {
        results[name] = await check();
        if (!results[name]) {
          allHealthy = false;
        }
      } catch (error) {
        results[name] = false;
        allHealthy = false;
      }
    }

    return createResponse(
      {
        status: allHealthy ? 'healthy' : 'unhealthy',
        checks: results,
        timestamp: new Date().toISOString(),
      },
      {
        statusCode: allHealthy ? 200 : 503,
      }
    );
  });
};

