import Head from 'next/head';
import { siteConfig } from '@/lib/utils';

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
}

export function Seo({ title, description, pathname, image }: SeoProps) {
  const seo = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    image: `${siteConfig.url}${image || '/og-image.jpg'}`,
    url: `${siteConfig.url}${pathname || ''}`,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Head>
  );
}
