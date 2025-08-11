#!/usr/bin/env node

/**
 * SEO Monitoring Script
 * Helps track SEO improvements and indexing status
 */

const https = require('https');
const fs = require('fs');

const SITE_URL = process.env.SITE_URL || 'https://your-site.com';

// SEO Health Check Functions
async function checkRobotsTxt() {
  console.log('🤖 Checking robots.txt...');
  
  try {
    const response = await fetch(`${SITE_URL}/robots.txt`);
    const content = await response.text();
    
    const checks = {
      hasJsonBlocking: content.includes('*.json$'),
      hasApiBlocking: content.includes('/api/'),
      hasSitemap: content.includes('sitemap.xml'),
      hasUserAgent: content.includes('User-agent:')
    };
    
    console.log('✅ Robots.txt Status:');
    console.log(`   - JSON blocking removed: ${!checks.hasJsonBlocking ? '✅' : '❌'}`);
    console.log(`   - API blocking present: ${checks.hasApiBlocking ? '✅' : '❌'}`);
    console.log(`   - Sitemap referenced: ${checks.hasSitemap ? '✅' : '❌'}`);
    console.log(`   - User-agent defined: ${checks.hasUserAgent ? '✅' : '❌'}`);
    
    return checks;
  } catch (error) {
    console.error('❌ Error checking robots.txt:', error.message);
    return null;
  }
}

async function checkSitemap() {
  console.log('🗺️ Checking sitemap.xml...');
  
  try {
    const response = await fetch(`${SITE_URL}/sitemap.xml`);
    const content = await response.text();
    
    const urlCount = (content.match(/<url>/g) || []).length;
    const hasLastMod = content.includes('<lastmod>');
    const hasPriority = content.includes('<priority>');
    const hasChangeFreq = content.includes('<changefreq>');
    
    console.log('✅ Sitemap Status:');
    console.log(`   - Total URLs: ${urlCount}`);
    console.log(`   - Has lastmod: ${hasLastMod ? '✅' : '❌'}`);
    console.log(`   - Has priority: ${hasPriority ? '✅' : '❌'}`);
    console.log(`   - Has changefreq: ${hasChangeFreq ? '✅' : '❌'}`);
    
    return { urlCount, hasLastMod, hasPriority, hasChangeFreq };
  } catch (error) {
    console.error('❌ Error checking sitemap:', error.message);
    return null;
  }
}

async function checkPageIndexability(urls) {
  console.log('🔍 Checking page indexability...');
  
  const results = [];
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const content = await response.text();
      
      const hasNoIndex = content.includes('noindex');
      const hasCanonical = content.includes('rel="canonical"');
      const hasMetaDescription = content.includes('name="description"');
      const hasStructuredData = content.includes('application/ld+json');
      
      results.push({
        url,
        status: response.status,
        hasNoIndex,
        hasCanonical,
        hasMetaDescription,
        hasStructuredData
      });
      
      console.log(`   ${url}:`);
      console.log(`     - Status: ${response.status}`);
      console.log(`     - No-index: ${hasNoIndex ? '❌' : '✅'}`);
      console.log(`     - Canonical: ${hasCanonical ? '✅' : '❌'}`);
      console.log(`     - Meta desc: ${hasMetaDescription ? '✅' : '❌'}`);
      console.log(`     - Structured data: ${hasStructuredData ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ Error checking ${url}:`, error.message);
    }
  }
  
  return results;
}

async function generateSEOReport() {
  console.log('📊 Generating SEO Health Report...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    robotsTxt: await checkRobotsTxt(),
    sitemap: await checkSitemap(),
    pages: await checkPageIndexability([
      `${SITE_URL}`,
      `${SITE_URL}/blog`,
      `${SITE_URL}/blog/baraat-ceremony-seattle-indian-wedding`,
      `${SITE_URL}/blog/mehndi-ceremony-seattle-indian-wedding`,
      `${SITE_URL}/services`,
      `${SITE_URL}/contact`
    ])
  };
  
  // Save report to file
  const reportPath = `seo-report-${Date.now()}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📋 Report saved to: ${reportPath}`);
  console.log('\n🎯 Next Steps:');
  console.log('1. Submit sitemap to Google Search Console');
  console.log('2. Request indexing for any problematic pages');
  console.log('3. Monitor GSC for improvements over next 2 weeks');
  console.log('4. Run this script weekly to track progress');
  
  return report;
}

// Google Search Console Integration Helper
function generateGSCInstructions() {
  console.log('\n📋 Google Search Console Action Items:');
  console.log('\n1. Submit Sitemap:');
  console.log(`   - Go to GSC → Sitemaps`);
  console.log(`   - Add: ${SITE_URL}/sitemap.xml`);
  console.log(`   - Click Submit`);
  
  console.log('\n2. Request Indexing:');
  console.log(`   - Go to GSC → URL Inspection`);
  console.log(`   - Test each problematic URL`);
  console.log(`   - Click "Request Indexing"`);
  
  console.log('\n3. Monitor These Reports:');
  console.log(`   - Coverage (for indexing issues)`);
  console.log(`   - Performance (for traffic changes)`);
  console.log(`   - Core Web Vitals (for user experience)`);
}

// Main execution
if (require.main === module) {
  generateSEOReport()
    .then(() => {
      generateGSCInstructions();
    })
    .catch(error => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = {
  checkRobotsTxt,
  checkSitemap,
  checkPageIndexability,
  generateSEOReport
};
