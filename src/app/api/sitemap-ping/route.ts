/**
 * API route to ping search engines with the sitemap URL
 * This helps search engines discover and index the site faster
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seattleshaadi.com';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  
  try {
    await fetch('https://www.google.com/ping?sitemap=' + encodeURIComponent(sitemapUrl));
    await fetch('https://www.bing.com/ping?sitemap=' + encodeURIComponent(sitemapUrl));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}

export async function POST() {
  // Also allow POST requests for webhook integration
  return GET();
}

