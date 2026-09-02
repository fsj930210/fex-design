import { componentDocuments, type DocumentedComponent } from './data'

export function getComponentDocument(slug: string) {
  return slug in componentDocuments
    ? componentDocuments[slug as DocumentedComponent]
    : undefined
}

export function getDocumentSlugs() {
  return Object.keys(componentDocuments) as DocumentedComponent[]
}
