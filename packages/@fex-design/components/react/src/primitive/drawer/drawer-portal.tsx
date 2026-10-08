import { createPortal } from "react-dom"
import { use, type ReactNode } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { DrawerContext } from "./drawer-context"

export interface DrawerPortalProps {
  children?: ReactNode
  container?: HTMLElement | null
  forceMount?: boolean
}

export function DrawerPortal({ children, container, forceMount }: DrawerPortalProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerPortal must be used inside DrawerRoot")
  const { drawer, depth } = context
  const snapshot = useCoreStore(drawer)
  if (!snapshot.mounted && !forceMount) return null
  return createPortal(
    <div style={{ display: "contents", "--drawer-z-index": 50 + depth * 2 } as React.CSSProperties}>
      {children}
    </div>,
    container ?? document.body,
  )
}
