import type { Component } from 'solid-js'

export interface DocumentMeta {
  title: string
  description: string
}
export interface ComponentDocumentModule {
  default: Component
  frontmatter: DocumentMeta
}

const documents = import.meta.glob('../../content/components/*.mdx', { eager: true }) as Record<
  string,
  ComponentDocumentModule
>

export function getComponentDocument(slug: string) {
  return Object.entries(documents).find(([path]) => path.endsWith(`/${slug}.mdx`))?.[1]
}

export function getDocumentSlugs() {
  return Object.keys(documents)
    .map((path) => path.match(/\/([^/]+)\.mdx$/)?.[1])
    .filter((slug): slug is string => Boolean(slug))
    .sort()
}
