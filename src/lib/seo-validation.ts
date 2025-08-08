// SEO validation utilities to ensure best practices

export interface SEOValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
}

export interface SEOIssue {
  type: 'error' | 'warning';
  category: 'metadata' | 'content' | 'images' | 'performance' | 'structure';
  message: string;
  element?: string;
}

export interface SEOSuggestion {
  category: 'metadata' | 'content' | 'images' | 'performance' | 'structure';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

// Validate page metadata
export function validateMetadata(metadata: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
}): { issues: SEOIssue[]; suggestions: SEOSuggestion[] } {
  const issues: SEOIssue[] = [];
  const suggestions: SEOSuggestion[] = [];

  // Title validation
  if (!metadata.title) {
    issues.push({
      type: 'error',
      category: 'metadata',
      message: 'Page title is missing',
    });
  } else {
    if (metadata.title.length < 30) {
      issues.push({
        type: 'warning',
        category: 'metadata',
        message: 'Page title is too short (less than 30 characters)',
      });
    }
    if (metadata.title.length > 60) {
      issues.push({
        type: 'warning',
        category: 'metadata',
        message: 'Page title is too long (more than 60 characters)',
      });
    }
    if (!metadata.title.toLowerCase().includes('seattle') && !metadata.title.toLowerCase().includes('wedding')) {
      suggestions.push({
        category: 'metadata',
        message: 'Consider including location (Seattle) or primary keyword (wedding) in title',
        priority: 'medium',
      });
    }
  }

  // Description validation
  if (!metadata.description) {
    issues.push({
      type: 'error',
      category: 'metadata',
      message: 'Meta description is missing',
    });
  } else {
    if (metadata.description.length < 120) {
      issues.push({
        type: 'warning',
        category: 'metadata',
        message: 'Meta description is too short (less than 120 characters)',
      });
    }
    if (metadata.description.length > 160) {
      issues.push({
        type: 'warning',
        category: 'metadata',
        message: 'Meta description is too long (more than 160 characters)',
      });
    }
  }

  // Keywords validation
  if (!metadata.keywords || metadata.keywords.length === 0) {
    suggestions.push({
      category: 'metadata',
      message: 'Add relevant keywords for better SEO targeting',
      priority: 'medium',
    });
  } else if (metadata.keywords.length > 10) {
    suggestions.push({
      category: 'metadata',
      message: 'Consider reducing number of keywords (currently more than 10)',
      priority: 'low',
    });
  }

  return { issues, suggestions };
}

// Validate page content structure
export function validateContentStructure(content: {
  h1Count: number;
  h2Count: number;
  h3Count: number;
  wordCount: number;
  hasImages: boolean;
  imageCount: number;
  imagesWithAlt: number;
}): { issues: SEOIssue[]; suggestions: SEOSuggestion[] } {
  const issues: SEOIssue[] = [];
  const suggestions: SEOSuggestion[] = [];

  // H1 validation
  if (content.h1Count === 0) {
    issues.push({
      type: 'error',
      category: 'structure',
      message: 'Page is missing H1 heading',
    });
  } else if (content.h1Count > 1) {
    issues.push({
      type: 'warning',
      category: 'structure',
      message: 'Page has multiple H1 headings (should have only one)',
    });
  }

  // Content length validation
  if (content.wordCount < 300) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'Page content is too short (less than 300 words)',
    });
  }

  // Image alt text validation
  if (content.hasImages && content.imagesWithAlt < content.imageCount) {
    const missingAlt = content.imageCount - content.imagesWithAlt;
    issues.push({
      type: 'error',
      category: 'images',
      message: `${missingAlt} image(s) missing alt text`,
    });
  }

  // Heading structure suggestions
  if (content.h2Count === 0 && content.wordCount > 500) {
    suggestions.push({
      category: 'structure',
      message: 'Consider adding H2 headings to break up long content',
      priority: 'medium',
    });
  }

  return { issues, suggestions };
}

// Validate structured data
export function validateStructuredData(schemas: any[]): { issues: SEOIssue[]; suggestions: SEOSuggestion[] } {
  const issues: SEOIssue[] = [];
  const suggestions: SEOSuggestion[] = [];

  if (schemas.length === 0) {
    suggestions.push({
      category: 'structure',
      message: 'Add structured data (JSON-LD) for better search engine understanding',
      priority: 'high',
    });
  }

  // Check for required schemas for wedding business
  const schemaTypes = schemas.map(schema => schema['@type']).filter(Boolean);
  
  if (!schemaTypes.includes('LocalBusiness') && !schemaTypes.includes('Organization')) {
    suggestions.push({
      category: 'structure',
      message: 'Add LocalBusiness or Organization schema for local SEO',
      priority: 'high',
    });
  }

  if (!schemaTypes.includes('Service')) {
    suggestions.push({
      category: 'structure',
      message: 'Add Service schema to highlight wedding planning services',
      priority: 'medium',
    });
  }

  return { issues, suggestions };
}

// Overall SEO score calculation
export function calculateSEOScore(
  metadataResult: { issues: SEOIssue[]; suggestions: SEOSuggestion[] },
  contentResult: { issues: SEOIssue[]; suggestions: SEOSuggestion[] },
  structuredDataResult: { issues: SEOIssue[]; suggestions: SEOSuggestion[] }
): number {
  let score = 100;

  // Deduct points for errors and warnings
  const allIssues = [
    ...metadataResult.issues,
    ...contentResult.issues,
    ...structuredDataResult.issues,
  ];

  allIssues.forEach(issue => {
    if (issue.type === 'error') {
      score -= 15;
    } else if (issue.type === 'warning') {
      score -= 5;
    }
  });

  // Deduct points for high-priority suggestions
  const allSuggestions = [
    ...metadataResult.suggestions,
    ...contentResult.suggestions,
    ...structuredDataResult.suggestions,
  ];

  allSuggestions.forEach(suggestion => {
    if (suggestion.priority === 'high') {
      score -= 10;
    } else if (suggestion.priority === 'medium') {
      score -= 3;
    }
  });

  return Math.max(0, Math.min(100, score));
}

// Comprehensive SEO validation
export function validatePageSEO(pageData: {
  metadata: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
  };
  content: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    wordCount: number;
    hasImages: boolean;
    imageCount: number;
    imagesWithAlt: number;
  };
  structuredData: any[];
}): SEOValidationResult {
  const metadataResult = validateMetadata(pageData.metadata);
  const contentResult = validateContentStructure(pageData.content);
  const structuredDataResult = validateStructuredData(pageData.structuredData);

  const score = calculateSEOScore(metadataResult, contentResult, structuredDataResult);

  return {
    isValid: score >= 80,
    score,
    issues: [
      ...metadataResult.issues,
      ...contentResult.issues,
      ...structuredDataResult.issues,
    ],
    suggestions: [
      ...metadataResult.suggestions,
      ...contentResult.suggestions,
      ...structuredDataResult.suggestions,
    ],
  };
}

// Wedding-specific SEO keywords for validation
export const weddingKeywords = [
  'wedding planner',
  'wedding planning',
  'seattle wedding',
  'indian wedding',
  'south asian wedding',
  'luxury wedding',
  'wedding coordination',
  'wedding services',
  'bridal services',
  'wedding venue',
  'destination wedding',
  'multicultural wedding',
  'pacific northwest wedding',
  'bellevue wedding',
  'tacoma wedding',
];

// Check if content includes relevant wedding keywords
export function validateWeddingKeywords(content: string): {
  foundKeywords: string[];
  missingKeywords: string[];
  keywordDensity: number;
} {
  const lowerContent = content.toLowerCase();
  const words = content.split(/\s+/).length;
  
  const foundKeywords = weddingKeywords.filter(keyword => 
    lowerContent.includes(keyword.toLowerCase())
  );
  
  const missingKeywords = weddingKeywords.filter(keyword => 
    !lowerContent.includes(keyword.toLowerCase())
  );

  const totalKeywordOccurrences = foundKeywords.reduce((count, keyword) => {
    const matches = lowerContent.match(new RegExp(keyword.toLowerCase(), 'g'));
    return count + (matches ? matches.length : 0);
  }, 0);

  const keywordDensity = words > 0 ? (totalKeywordOccurrences / words) * 100 : 0;

  return {
    foundKeywords,
    missingKeywords,
    keywordDensity,
  };
}

