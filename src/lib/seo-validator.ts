// SEO Validation utilities for development and testing

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PageSEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: any[];
}

// Validate title tag
export function validateTitle(title?: string): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!title) {
    result.isValid = false;
    result.errors.push('Title is missing');
    return result;
  }

  if (title.length < 30) {
    result.warnings.push('Title is shorter than 30 characters - consider making it more descriptive');
  }

  if (title.length > 60) {
    result.warnings.push('Title is longer than 60 characters - it may be truncated in search results');
  }

  if (!title.includes('Seattle') && !title.includes('Wedding')) {
    result.suggestions.push('Consider including "Seattle" and "Wedding" in the title for better local SEO');
  }

  return result;
}

// Validate meta description
export function validateDescription(description?: string): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!description) {
    result.isValid = false;
    result.errors.push('Meta description is missing');
    return result;
  }

  if (description.length < 120) {
    result.warnings.push('Description is shorter than 120 characters - consider making it more detailed');
  }

  if (description.length > 160) {
    result.warnings.push('Description is longer than 160 characters - it may be truncated in search results');
  }

  if (!description.includes('Seattle')) {
    result.suggestions.push('Consider including "Seattle" in the description for better local SEO');
  }

  return result;
}

// Validate Open Graph data
export function validateOpenGraph(og?: PageSEOData['openGraph']): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!og) {
    result.warnings.push('Open Graph data is missing - this affects social media sharing');
    return result;
  }

  if (!og.title) {
    result.warnings.push('Open Graph title is missing');
  }

  if (!og.description) {
    result.warnings.push('Open Graph description is missing');
  }

  if (!og.image) {
    result.warnings.push('Open Graph image is missing - social shares will look less appealing');
  }

  if (!og.type) {
    result.suggestions.push('Consider setting Open Graph type (website, article, etc.)');
  }

  return result;
}

// Validate Twitter Card data
export function validateTwitterCard(twitter?: PageSEOData['twitter']): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!twitter) {
    result.warnings.push('Twitter Card data is missing');
    return result;
  }

  if (!twitter.card) {
    result.warnings.push('Twitter Card type is missing');
  }

  if (twitter.card === 'summary_large_image' && !twitter.image) {
    result.warnings.push('Twitter Card image is missing for summary_large_image card type');
  }

  return result;
}

// Validate structured data
export function validateStructuredData(structuredData?: any[]): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  if (!structuredData || structuredData.length === 0) {
    result.warnings.push('No structured data found - this helps search engines understand your content');
    return result;
  }

  const hasLocalBusiness = structuredData.some(data => data['@type'] === 'LocalBusiness');
  const hasOrganization = structuredData.some(data => data['@type'] === 'Organization');
  const hasWebSite = structuredData.some(data => data['@type'] === 'WebSite');

  if (!hasLocalBusiness) {
    result.suggestions.push('Consider adding LocalBusiness schema for better local SEO');
  }

  if (!hasOrganization) {
    result.suggestions.push('Consider adding Organization schema');
  }

  if (!hasWebSite) {
    result.suggestions.push('Consider adding WebSite schema with search action');
  }

  return result;
}

// Validate complete page SEO
export function validatePageSEO(data: PageSEOData): SEOValidationResult {
  const result: SEOValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  // Validate individual components
  const titleResult = validateTitle(data.title);
  const descriptionResult = validateDescription(data.description);
  const ogResult = validateOpenGraph(data.openGraph);
  const twitterResult = validateTwitterCard(data.twitter);
  const structuredDataResult = validateStructuredData(data.structuredData);

  // Combine results
  const allResults = [titleResult, descriptionResult, ogResult, twitterResult, structuredDataResult];
  
  allResults.forEach(componentResult => {
    if (!componentResult.isValid) {
      result.isValid = false;
    }
    result.errors.push(...componentResult.errors);
    result.warnings.push(...componentResult.warnings);
    result.suggestions.push(...componentResult.suggestions);
  });

  // Additional cross-component validations
  if (data.title && data.openGraph?.title && data.title !== data.openGraph.title) {
    result.suggestions.push('Title and Open Graph title are different - consider keeping them consistent');
  }

  if (data.description && data.openGraph?.description && data.description !== data.openGraph.description) {
    result.suggestions.push('Meta description and Open Graph description are different - consider keeping them consistent');
  }

  return result;
}

// Wedding-specific SEO validation
export function validateWeddingSEO(data: PageSEOData): SEOValidationResult {
  const result = validatePageSEO(data);

  // Wedding industry specific checks
  const weddingKeywords = ['wedding', 'bride', 'groom', 'ceremony', 'reception', 'planner', 'coordinator'];
  const locationKeywords = ['seattle', 'washington', 'wa', 'pacific northwest'];

  const titleLower = data.title?.toLowerCase() || '';
  const descriptionLower = data.description?.toLowerCase() || '';

  const hasWeddingKeywords = weddingKeywords.some(keyword => 
    titleLower.includes(keyword) || descriptionLower.includes(keyword)
  );

  const hasLocationKeywords = locationKeywords.some(keyword => 
    titleLower.includes(keyword) || descriptionLower.includes(keyword)
  );

  if (!hasWeddingKeywords) {
    result.suggestions.push('Consider including wedding-related keywords in title or description');
  }

  if (!hasLocationKeywords) {
    result.suggestions.push('Consider including location keywords (Seattle, Washington) for local SEO');
  }

  // Check for Indian wedding keywords
  const indianWeddingKeywords = ['indian', 'hindu', 'sikh', 'punjabi', 'gujarati', 'traditional', 'cultural'];
  const hasIndianKeywords = indianWeddingKeywords.some(keyword => 
    titleLower.includes(keyword) || descriptionLower.includes(keyword)
  );

  if (!hasIndianKeywords) {
    result.suggestions.push('Consider including Indian/cultural wedding keywords to target your niche market');
  }

  return result;
}

// Generate SEO score
export function calculateSEOScore(validationResult: SEOValidationResult): number {
  let score = 100;
  
  // Deduct points for errors and warnings
  score -= validationResult.errors.length * 20;
  score -= validationResult.warnings.length * 10;
  score -= validationResult.suggestions.length * 5;
  
  return Math.max(0, score);
}

// Format validation results for display
export function formatValidationResults(result: SEOValidationResult): string {
  let output = '';
  
  if (result.errors.length > 0) {
    output += '❌ Errors:\n';
    result.errors.forEach(error => output += `  • ${error}\n`);
    output += '\n';
  }
  
  if (result.warnings.length > 0) {
    output += '⚠️  Warnings:\n';
    result.warnings.forEach(warning => output += `  • ${warning}\n`);
    output += '\n';
  }
  
  if (result.suggestions.length > 0) {
    output += '💡 Suggestions:\n';
    result.suggestions.forEach(suggestion => output += `  • ${suggestion}\n`);
    output += '\n';
  }
  
  const score = calculateSEOScore(result);
  output += `📊 SEO Score: ${score}/100\n`;
  
  return output;
}

