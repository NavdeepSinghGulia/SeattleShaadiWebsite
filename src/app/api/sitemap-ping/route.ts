/**
 * API route to ping search engines with the sitemap URL
 * This helps search engines discover and index the site faster
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianweddingsite.com';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  
  try {
    // Ping Google
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    
    // Ping Bing
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    
    // Ping Yandex
    await fetch(`https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully pinged search engines with sitemap URL',
      sitemapUrl
    });
  } catch (error) {
    console.error('Error pinging search engines:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to ping search engines',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Also allow POST requests for webhook integration
  return GET();
}

