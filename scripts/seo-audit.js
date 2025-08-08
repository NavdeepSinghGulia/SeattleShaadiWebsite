#!/usr/bin/env node

/**
 * SEO Audit Script for Seattle Shaadi Website
 * 
 * This script performs a comprehensive SEO audit of the website
 * and generates a report with actionable recommendations.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

// Audit results
const auditResults = {
  passed: [],
  warnings: [],
  errors: [],
  score: 0,
};

function addResult(type, message, details = '') {
  auditResults[type].push({ message, details });
}

// Check Next.js configuration
function auditNextConfig() {
  log('\n🔍 Auditing Next.js Configuration...', 'cyan');
  
  const configPath = path.join(process.cwd(), 'next.config.ts');
  if (!fileExists(configPath)) {
    addResult('errors', 'next.config.ts not found');
    return;
  }

  const config = readFile(configPath);
  if (!config) {
    addResult('errors', 'Could not read next.config.ts');
    return;
  }

  // Check for SEO-friendly configurations
  const checks = [
    { pattern: /compress:\s*true/, message: 'Compression enabled' },
    { pattern: /poweredByHeader:\s*false/, message: 'X-Powered-By header disabled' },
    { pattern: /generateEtags:\s*true/, message: 'ETags generation enabled' },
    { pattern: /formats:\s*\[.*webp.*\]/, message: 'WebP image format enabled' },
    { pattern: /X-Robots-Tag/, message: 'SEO-friendly robot headers configured' },
  ];

  checks.forEach(check => {
    if (check.pattern.test(config)) {
      addResult('passed', check.message);
    } else {
      addResult('warnings', `Missing: ${check.message}`);
    }
  });
}

// Check metadata implementation
function auditMetadata() {
  log('\n📝 Auditing Metadata Implementation...', 'cyan');
  
  const metadataPath = path.join(process.cwd(), 'src/lib/metadata.ts');
  if (!fileExists(metadataPath)) {
    addResult('errors', 'Metadata utility file not found');
    return;
  }

  const metadata = readFile(metadataPath);
  if (!metadata) {
    addResult('errors', 'Could not read metadata.ts');
    return;
  }

  const checks = [
    { pattern: /generateMetadata/, message: 'Metadata generation function exists' },
    { pattern: /openGraph/, message: 'Open Graph metadata configured' },
    { pattern: /twitter/, message: 'Twitter Card metadata configured' },
    { pattern: /robots/, message: 'Robot directives configured' },
    { pattern: /canonical/, message: 'Canonical URL handling implemented' },
    { pattern: /Seattle.*wedding/i, message: 'Location-specific keywords included' },
  ];

  checks.forEach(check => {
    if (check.pattern.test(metadata)) {
      addResult('passed', check.message);
    } else {
      addResult('warnings', `Missing: ${check.message}`);
    }
  });
}

// Check structured data
function auditStructuredData() {
  log('\n🏗️ Auditing Structured Data...', 'cyan');
  
  const structuredDataPath = path.join(process.cwd(), 'src/lib/structured-data.ts');
  if (!fileExists(structuredDataPath)) {
    addResult('errors', 'Structured data file not found');
    return;
  }

  const structuredData = readFile(structuredDataPath);
  if (!structuredData) {
    addResult('errors', 'Could not read structured-data.ts');
    return;
  }

  const schemas = [
    { pattern: /LocalBusiness/, message: 'LocalBusiness schema implemented' },
    { pattern: /Service/, message: 'Service schema implemented' },
    { pattern: /WebSite/, message: 'Website schema implemented' },
    { pattern: /BreadcrumbList/, message: 'Breadcrumb schema implemented' },
    { pattern: /FAQPage/, message: 'FAQ schema available' },
    { pattern: /Review/, message: 'Review schema available' },
  ];

  schemas.forEach(schema => {
    if (schema.pattern.test(structuredData)) {
      addResult('passed', schema.message);
    } else {
      addResult('warnings', `Missing: ${schema.message}`);
    }
  });
}

// Check sitemap implementation
function auditSitemap() {
  log('\n🗺️ Auditing Sitemap...', 'cyan');
  
  const sitemapPath = path.join(process.cwd(), 'src/app/sitemap.ts');
  if (!fileExists(sitemapPath)) {
    addResult('errors', 'Dynamic sitemap not found');
    return;
  }

  const sitemap = readFile(sitemapPath);
  if (!sitemap) {
    addResult('errors', 'Could not read sitemap.ts');
    return;
  }

  if (sitemap.includes('MetadataRoute.Sitemap')) {
    addResult('passed', 'Dynamic sitemap implemented');
  } else {
    addResult('warnings', 'Sitemap may not be properly typed');
  }

  if (sitemap.includes('changeFrequency')) {
    addResult('passed', 'Change frequency specified');
  } else {
    addResult('warnings', 'Missing change frequency in sitemap');
  }

  if (sitemap.includes('priority')) {
    addResult('passed', 'Page priorities specified');
  } else {
    addResult('warnings', 'Missing page priorities in sitemap');
  }
}

// Check robots.txt implementation
function auditRobots() {
  log('\n🤖 Auditing Robots.txt...', 'cyan');
  
  const robotsPath = path.join(process.cwd(), 'src/app/robots.ts');
  if (!fileExists(robotsPath)) {
    addResult('errors', 'Dynamic robots.txt not found');
    return;
  }

  const robots = readFile(robotsPath);
  if (!robots) {
    addResult('errors', 'Could not read robots.ts');
    return;
  }

  if (robots.includes('MetadataRoute.Robots')) {
    addResult('passed', 'Dynamic robots.txt implemented');
  } else {
    addResult('warnings', 'Robots.txt may not be properly typed');
  }

  if (robots.includes('sitemap')) {
    addResult('passed', 'Sitemap reference in robots.txt');
  } else {
    addResult('warnings', 'Missing sitemap reference in robots.txt');
  }
}

// Check image optimization
function auditImages() {
  log('\n🖼️ Auditing Image Optimization...', 'cyan');
  
  const imageUtilsPath = path.join(process.cwd(), 'src/lib/image-utils.ts');
  if (!fileExists(imageUtilsPath)) {
    addResult('warnings', 'Image optimization utilities not found');
    return;
  }

  const imageUtils = readFile(imageUtilsPath);
  if (!imageUtils) {
    addResult('warnings', 'Could not read image-utils.ts');
    return;
  }

  const checks = [
    { pattern: /generateWeddingAltText/, message: 'Alt text generation utility available' },
    { pattern: /validateAltText/, message: 'Alt text validation implemented' },
    { pattern: /generateImageStructuredData/, message: 'Image structured data available' },
    { pattern: /getImageSizes/, message: 'Responsive image sizes configured' },
  ];

  checks.forEach(check => {
    if (check.pattern.test(imageUtils)) {
      addResult('passed', check.message);
    } else {
      addResult('warnings', `Missing: ${check.message}`);
    }
  });
}

// Check performance monitoring
function auditPerformance() {
  log('\n⚡ Auditing Performance Monitoring...', 'cyan');
  
  const webVitalsPath = path.join(process.cwd(), 'src/lib/web-vitals.ts');
  if (!fileExists(webVitalsPath)) {
    addResult('warnings', 'Web Vitals monitoring not found');
    return;
  }

  const webVitals = readFile(webVitalsPath);
  if (!webVitals) {
    addResult('warnings', 'Could not read web-vitals.ts');
    return;
  }

  const checks = [
    { pattern: /getCLS/, message: 'Cumulative Layout Shift tracking' },
    { pattern: /getFID/, message: 'First Input Delay tracking' },
    { pattern: /getLCP/, message: 'Largest Contentful Paint tracking' },
    { pattern: /getFCP/, message: 'First Contentful Paint tracking' },
    { pattern: /getTTFB/, message: 'Time to First Byte tracking' },
  ];

  checks.forEach(check => {
    if (check.pattern.test(webVitals)) {
      addResult('passed', check.message);
    } else {
      addResult('warnings', `Missing: ${check.message}`);
    }
  });
}

// Calculate overall score
function calculateScore() {
  const totalChecks = auditResults.passed.length + auditResults.warnings.length + auditResults.errors.length;
  const passedWeight = auditResults.passed.length * 1;
  const warningWeight = auditResults.warnings.length * 0.5;
  const errorWeight = auditResults.errors.length * 0;
  
  auditResults.score = totalChecks > 0 ? Math.round(((passedWeight + warningWeight + errorWeight) / totalChecks) * 100) : 0;
}

// Generate report
function generateReport() {
  log('\n📊 SEO Audit Report', 'magenta');
  log('='.repeat(50), 'magenta');
  
  log(`\n✅ Passed: ${auditResults.passed.length}`, 'green');
  auditResults.passed.forEach(item => {
    log(`  • ${item.message}`, 'green');
  });
  
  log(`\n⚠️  Warnings: ${auditResults.warnings.length}`, 'yellow');
  auditResults.warnings.forEach(item => {
    log(`  • ${item.message}`, 'yellow');
  });
  
  log(`\n❌ Errors: ${auditResults.errors.length}`, 'red');
  auditResults.errors.forEach(item => {
    log(`  • ${item.message}`, 'red');
  });
  
  log(`\n🎯 Overall SEO Score: ${auditResults.score}/100`, auditResults.score >= 80 ? 'green' : auditResults.score >= 60 ? 'yellow' : 'red');
  
  if (auditResults.score >= 80) {
    log('\n🎉 Excellent! Your SEO implementation is in great shape!', 'green');
  } else if (auditResults.score >= 60) {
    log('\n👍 Good progress! Address the warnings to improve your SEO score.', 'yellow');
  } else {
    log('\n🔧 Needs improvement. Focus on fixing errors and warnings.', 'red');
  }
  
  log('\n💡 Recommendations:', 'cyan');
  log('  • Regularly update your sitemap with new content', 'white');
  log('  • Monitor Core Web Vitals in Google Search Console', 'white');
  log('  • Test structured data with Google\'s Rich Results Test', 'white');
  log('  • Optimize images with descriptive alt text', 'white');
  log('  • Keep metadata fresh and keyword-optimized', 'white');
}

// Main audit function
function runAudit() {
  log('🚀 Starting SEO Audit for Seattle Shaadi Website...', 'cyan');
  
  auditNextConfig();
  auditMetadata();
  auditStructuredData();
  auditSitemap();
  auditRobots();
  auditImages();
  auditPerformance();
  
  calculateScore();
  generateReport();
}

// Run the audit
runAudit();

