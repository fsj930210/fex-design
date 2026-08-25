import type { ApiValue, Framework } from './model'

export const PREVIEW_PROTOCOL = 'fex-preview-v1' as const

export type PreviewHostMessage = {
  protocol: typeof PREVIEW_PROTOCOL
  type: 'render'
  props: Record<string, ApiValue>
}

export type PreviewRuntimeMessage =
  | { protocol: typeof PREVIEW_PROTOCOL; type: 'ready'; framework: Framework }
  | { protocol: typeof PREVIEW_PROTOCOL; type: 'resize'; height: number }
  | { protocol: typeof PREVIEW_PROTOCOL; type: 'event'; name: string; args: unknown[] }
  | { protocol: typeof PREVIEW_PROTOCOL; type: 'error'; message: string }

export function isPreviewHostMessage(value: unknown): value is PreviewHostMessage {
  if (!value || typeof value !== 'object') return false
  const message = value as Partial<PreviewHostMessage>
  return message.protocol === PREVIEW_PROTOCOL && message.type === 'render' && !!message.props
}
