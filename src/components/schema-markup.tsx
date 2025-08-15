'use client';

import React from 'react';

interface SchemaMarkupProps {
  type: string;
  data: Record<string, any>;
  url?: string;
}

export function SchemaMarkup({ type, data, url = '' }: SchemaMarkupProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seattleshaadi.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    url: fullUrl,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

