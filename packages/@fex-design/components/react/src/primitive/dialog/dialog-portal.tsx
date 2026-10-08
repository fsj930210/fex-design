import { createPortal } from "react-dom"
import type { ReactNode } from "react"
import { useDialog } from "./use-dialog"

export interface DialogPortalProps {
  children?: ReactNode
  container?: HTMLElement | null
  forceMount?: boolean
}

export function DialogPortal({ children, container, forceMount }: DialogPortalProps) {
  const { snapshot } = useDialog("DialogPortal")
  const portalContainer = container ?? globalThis.document?.body
  if (!portalContainer || (!snapshot.mounted && !forceMount)) {
    return null
  }
  return createPortal(children, portalContainer)
}
