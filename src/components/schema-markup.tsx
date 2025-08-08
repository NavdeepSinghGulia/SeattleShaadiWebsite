import Script from 'next/script';

interface SchemaMarkupProps {
  schema: object | object[];
  id?: string;
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <Script
          key={id ? `${id}-${index}` : `schema-${index}`}
          id={id ? `${id}-${index}` : `schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0)
          }}
        />
      ))}
    </>
  );
}

