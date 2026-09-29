import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { useTooltip } from "./use-tooltip"

export interface TooltipPortalProps {
  children?: ReactNode
  container?: HTMLElement | null
  forceMount?: boolean
}

export function TooltipPortal({ children, container, forceMount }: TooltipPortalProps) {
  const { overlay, snapshot } = useTooltip("TooltipPortal")
  const target = container ?? overlay.resolvePopupContainer()
  return target && (snapshot.mounted || forceMount) ? createPortal(children, target) : null
}
