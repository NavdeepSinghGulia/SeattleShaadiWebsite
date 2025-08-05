#!/usr/bin/env node

/**
 * SEO Audit Script for Seattle Shaadi
 * 
 * This script performs basic SEO checks on the website
 * Run with: node scripts/seo-audit.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  const exists = fs.existsSync(filePath);
  log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Found' : 'Missing'}`, exists ? 'green' : 'red');
  return exists;
}

function checkFileContent(filePath, searchTerm, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const found = content.includes(searchTerm);
    log(`${found ? '✅' : '❌'} ${description}: ${found ? 'Found' : 'Missing'}`, found ? 'green' : 'red');
    return found;
  } catch (error) {
    log(`❌ ${description}: File not readable`, 'red');
    return false;
  }
}

function auditMetadata() {
  log('\n📊 Metadata Audit', 'bold');
  log('==================', 'blue');
  
  checkFileExists('src/lib/metadata.ts', 'Metadata utility file');
  checkFileContent('src/app/layout.tsx', 'generateMetadata', 'Layout uses metadata utility');
  checkFileContent('src/lib/metadata.ts', 'openGraph', 'Open Graph tags configured');
  checkFileContent('src/lib/metadata.ts', 'twitter', 'Twitter Card tags configured');
}

function auditStructuredData() {
  log('\n🏗️  Structured Data Audit', 'bold');
  log('==========================', 'blue');
  
  checkFileExists('src/lib/schema.ts', 'Schema markup utility');
  checkFileExists('src/components/seo/schema-markup.tsx', 'Schema markup component');
  checkFileContent('src/lib/schema.ts', 'LocalBusiness', 'LocalBusiness schema');
  checkFileContent('src/lib/schema.ts', 'Organization', 'Organization schema');
  checkFileContent('src/lib/schema.ts', 'WebSite', 'WebSite schema');
}

function auditSEOFiles() {
  log('\n📄 SEO Files Audit', 'bold');
  log('===================', 'blue');
  
  checkFileExists('public/robots.txt', 'robots.txt file');
  checkFileExists('src/app/sitemap.ts', 'sitemap.xml generator');
  
  if (fs.existsSync('public/robots.txt')) {
    checkFileContent('public/robots.txt', 'Sitemap:', 'robots.txt includes sitemap reference');
  }
}

function auditImages() {
  log('\n🖼️  Image Optimization Audit', 'bold');
  log('=============================', 'blue');
  
  checkFileExists('src/components/ui/optimized-image.tsx', 'Optimized image component');
  checkFileContent('next.config.ts', 'formats:', 'Next.js image formats configured');
  checkFileContent('next.config.ts', 'deviceSizes:', 'Device sizes configured');
}

function auditAnalytics() {
  log('\n📈 Analytics Audit', 'bold');
  log('==================', 'blue');
  
  checkFileExists('src/components/analytics/google-analytics.tsx', 'Google Analytics component');
  checkFileExists('src/lib/analytics.ts', 'Analytics utility functions');
  checkFileContent('src/app/layout.tsx', 'GoogleAnalytics', 'Analytics integrated in layout');
}

function auditPerformance() {
  log('\n⚡ Performance Audit', 'bold');
  log('====================', 'blue');
  
  checkFileContent('next.config.ts', 'compress: true', 'Compression enabled');
  checkFileContent('next.config.ts', 'poweredByHeader: false', 'X-Powered-By header disabled');
  checkFileContent('next.config.ts', 'optimizePackageImports', 'Package imports optimized');
}

function auditSecurity() {
  log('\n🔒 Security Headers Audit', 'bold');
  log('=========================', 'blue');
  
  checkFileContent('next.config.ts', 'X-Frame-Options', 'X-Frame-Options header');
  checkFileContent('next.config.ts', 'X-Content-Type-Options', 'X-Content-Type-Options header');
  checkFileContent('next.config.ts', 'Referrer-Policy', 'Referrer-Policy header');
}

function auditAccessibility() {
  log('\n♿ Accessibility Audit', 'bold');
  log('======================', 'blue');
  
  checkFileContent('src/app/layout.tsx', 'lang="en"', 'HTML lang attribute set');
  checkFileExists('src/components/seo/breadcrumbs.tsx', 'Breadcrumb navigation component');
}

function generateRecommendations() {
  log('\n💡 Recommendations', 'bold');
  log('==================', 'yellow');
  
  const recommendations = [
    '1. Update Google Analytics ID in src/components/analytics/google-analytics.tsx',
    '2. Replace placeholder URLs in src/lib/metadata.ts with actual domain',
    '3. Add actual business contact information in src/lib/schema.ts',
    '4. Set up Google Search Console verification',
    '5. Add actual social media URLs in schema markup',
    '6. Consider adding FAQ schema to FAQ page',
    '7. Optimize images with proper alt attributes',
    '8. Test Core Web Vitals and optimize if needed',
    '9. Set up conversion tracking for contact forms',
    '10. Consider adding blog section for content marketing'
  ];
  
  recommendations.forEach(rec => log(rec, 'yellow'));
}

function runAudit() {
  log('🔍 Seattle Shaadi SEO Audit', 'bold');
  log('============================', 'blue');
  log('Starting comprehensive SEO audit...\n');
  
  auditMetadata();
  auditStructuredData();
  auditSEOFiles();
  auditImages();
  auditAnalytics();
  auditPerformance();
  auditSecurity();
  auditAccessibility();
  generateRecommendations();
  
  log('\n✨ SEO Audit Complete!', 'bold');
  log('Check the results above and implement any missing features.', 'blue');
}

// Run the audit
runAudit();

