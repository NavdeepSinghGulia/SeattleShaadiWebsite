/**
 * SEO Keywords and Content Strategy
 * 
 * Comprehensive keyword targeting for Indian wedding planning
 * in Seattle and USA markets.
 */

// Primary target keywords (high search volume, high intent)
export const PRIMARY_KEYWORDS = [
  'best Indian wedding planner Seattle',
  'Indian wedding planner USA',
  'Seattle Shaadi wedding planning',
  'Indian wedding coordinator Seattle',
  'Hindu wedding planner Seattle',
  'Sikh wedding planner Seattle',
  'Indian wedding venues Seattle',
  'traditional Indian wedding Seattle',
  'Indian wedding decorations Seattle',
  'Indian wedding catering Seattle'
] as const;

// Long-tail keywords (lower competition, high conversion)
export const LONG_TAIL_KEYWORDS = [
  'affordable Indian wedding planner Seattle',
  'luxury Indian wedding planner Seattle',
  'Indian wedding planner near me Seattle',
  'best Hindu wedding coordinator Seattle',
  'Indian wedding planning services Seattle',
  'traditional Indian wedding ceremony Seattle',
  'Indian wedding mandap decoration Seattle',
  'Indian wedding photography Seattle',
  'Indian wedding DJ Seattle',
  'Indian wedding makeup artist Seattle',
  'Indian wedding henna artist Seattle',
  'Indian wedding invitation design Seattle',
  'Indian wedding planning checklist',
  'Indian wedding traditions and customs',
  'Indian wedding budget planning',
  'Indian wedding timeline planning'
] as const;

// Location-based keywords
export const LOCATION_KEYWORDS = [
  'Seattle Indian wedding planner',
  'Bellevue Indian wedding planner',
  'Tacoma Indian wedding planner',
  'Everett Indian wedding planner',
  'Spokane Indian wedding planner',
  'Washington State Indian wedding planner',
  'Pacific Northwest Indian wedding planner',
  'King County Indian wedding planner',
  'Pierce County Indian wedding planner',
  'Snohomish County Indian wedding planner'
] as const;

// Service-based keywords
export const SERVICE_KEYWORDS = [
  'Indian wedding planning services',
  'Hindu wedding ceremony planning',
  'Sikh wedding ceremony planning',
  'Indian wedding venue selection',
  'Indian wedding vendor coordination',
  'Indian wedding day coordination',
  'Indian wedding decoration services',
  'Indian wedding catering coordination',
  'Indian wedding photography coordination',
  'Indian wedding entertainment booking',
  'Indian wedding transportation planning',
  'Indian wedding guest accommodation',
  'Indian wedding invitation services',
  'Indian wedding favor coordination'
] as const;

// Competitor analysis keywords
export const COMPETITOR_KEYWORDS = [
  'Seattle wedding planner vs Indian specialist',
  'why choose Indian wedding planner',
  'Indian wedding planner reviews Seattle',
  'top rated Indian wedding planner Seattle',
  'experienced Indian wedding planner Seattle',
  'certified Indian wedding planner Seattle'
] as const;

// Content marketing keywords
export const CONTENT_KEYWORDS = [
  'Indian wedding planning guide',
  'Indian wedding traditions explained',
  'Indian wedding ceremony timeline',
  'Indian wedding budget breakdown',
  'Indian wedding venue checklist',
  'Indian wedding decoration ideas',
  'Indian wedding menu planning',
  'Indian wedding guest etiquette',
  'Indian wedding photography tips',
  'Indian wedding planning mistakes to avoid',
  'Indian wedding planning timeline',
  'Indian wedding vendor selection guide'
] as const;

// Seasonal keywords
export const SEASONAL_KEYWORDS = [
  'spring Indian wedding Seattle',
  'summer Indian wedding Seattle',
  'fall Indian wedding Seattle',
  'winter Indian wedding Seattle',
  'Indian wedding season planning',
  'best time for Indian wedding Seattle',
  'Indian wedding weather considerations Seattle'
] as const;

// FAQ-based keywords (voice search optimization)
export const FAQ_KEYWORDS = [
  'how to plan an Indian wedding in Seattle',
  'what does an Indian wedding planner do',
  'how much does Indian wedding planning cost',
  'how long does Indian wedding planning take',
  'what to look for in Indian wedding planner',
  'how to choose Indian wedding venue Seattle',
  'what are Indian wedding traditions',
  'how to plan Hindu wedding ceremony',
  'how to plan Sikh wedding ceremony',
  'what is Indian wedding timeline'
] as const;

// All keywords combined for easy access
export const ALL_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...LONG_TAIL_KEYWORDS,
  ...LOCATION_KEYWORDS,
  ...SERVICE_KEYWORDS,
  ...COMPETITOR_KEYWORDS,
  ...CONTENT_KEYWORDS,
  ...SEASONAL_KEYWORDS,
  ...FAQ_KEYWORDS
] as const;

// Keyword density targets (for content optimization)
export const KEYWORD_DENSITY_TARGETS = {
  primary: 1.5, // 1.5% density for primary keywords
  secondary: 1.0, // 1.0% density for secondary keywords
  longTail: 0.5, // 0.5% density for long-tail keywords
} as const;

// Content length recommendations
export const CONTENT_LENGTH_TARGETS = {
  homepage: 800, // minimum words for homepage
  servicePages: 1200, // minimum words for service pages
  blogPosts: 2000, // minimum words for blog posts
  locationPages: 1000, // minimum words for location-specific pages
} as const;

