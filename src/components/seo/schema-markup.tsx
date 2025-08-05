'use client';

import { 
  createLocalBusinessSchema, 
  createOrganizationSchema, 
  createWebSiteSchema, 
  createWeddingServiceSchema,
  createFAQSchema,
  createBreadcrumbSchema
} from '@/lib/schema';

interface SchemaMarkupProps {
  type: 'local-business' | 'organization' | 'website' | 'service' | 'faq' | 'breadcrumb';
  data?: any;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema;

  switch (type) {
    case 'local-business':
      schema = createLocalBusinessSchema();
      break;
    case 'organization':
      schema = createOrganizationSchema();
      break;
    case 'website':
      schema = createWebSiteSchema();
      break;
    case 'service':
      schema = createWeddingServiceSchema();
      break;
    case 'faq':
      schema = createFAQSchema(data || []);
      break;
    case 'breadcrumb':
      schema = createBreadcrumbSchema(data || []);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

// Combined schema component for the homepage
export function HomePageSchemas() {
  return (
    <>
      <SchemaMarkup type="local-business" />
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />
      <SchemaMarkup type="service" />
    </>
  );
}

// Service page schema
export function ServicePageSchema() {
  return <SchemaMarkup type="service" />;
}

// FAQ page schema
export function FAQPageSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return <SchemaMarkup type="faq" data={faqs} />;
}

// Breadcrumb schema
export function BreadcrumbSchema({ breadcrumbs }: { breadcrumbs: Array<{ name: string; url: string }> }) {
  return <SchemaMarkup type="breadcrumb" data={breadcrumbs} />;
}

