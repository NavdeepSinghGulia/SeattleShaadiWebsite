import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';

/**
 * Route handler for /favicon
 * This resolves the build error by providing a direct route for favicon
 */
export async function GET() {
  try {
    // Get favicon from public directory
    const filePath = join(process.cwd(), 'public', 'favicon', 'favicon.ico');
    const fileBuffer = readFileSync(filePath);
    
    // Return the favicon with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving favicon:', error);
    return new NextResponse(null, { status: 404 });
  }
}

