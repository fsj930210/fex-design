import type { Component } from 'solid-js'

export type {
  ApiProperty,
  ApiSlot,
  ApiValue,
  ComponentApi,
  Framework,
  FrameworkApi,
} from '@fex-design/docs-shared/model'
export type { PreviewRuntimeMessage } from '@fex-design/docs-shared/preview-protocol'

export interface DocumentMeta {
  title: string
  description: string
}

export interface ComponentDocumentModule {
  default: Component
  frontmatter: DocumentMeta
}
