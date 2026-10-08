import { createPortal } from "react-dom"
import type { ReactNode } from "react"
import { useContextMenu } from "./use-context-menu"

export interface ContextMenuPortalProps {
  children?: ReactNode
  container?: HTMLElement | null
  forceMount?: boolean
}

export function ContextMenuPortal({ children, container, forceMount }: ContextMenuPortalProps) {
  const { overlay, snapshot } = useContextMenu("ContextMenuPortal")
  const popupContainer = container ?? overlay.resolvePopupContainer()
  if (!popupContainer || (!snapshot.overlay.mounted && !forceMount)) return null
  return createPortal(children, popupContainer)
}
