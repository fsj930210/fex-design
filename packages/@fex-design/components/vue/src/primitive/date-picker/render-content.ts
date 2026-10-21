import type { VNodeChild } from 'vue'
// A tiny native functional component renders a caller-supplied vnode without adding DOM.
export function RenderContent(props: { value?: VNodeChild }) {
  return props.value
}
