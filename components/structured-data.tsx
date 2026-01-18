/**
 * StructuredData Component
 * Reusable component for injecting JSON-LD scripts
 */

import { JSONLDSchema, createJsonLdScript } from "@/lib/jsonld"

interface StructuredDataProps {
  schema: JSONLDSchema | JSONLDSchema[]
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: createJsonLdScript(schema) }}
      suppressHydrationWarning
    />
  )
}
