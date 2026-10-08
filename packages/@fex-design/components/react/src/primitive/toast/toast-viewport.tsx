import {
  toastStackContainerClassName,
  toastStackItemsClassName,
  toastStackLayerClassName,
  toastViewportClassName,
  type ToastPlacement,
} from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import { createPortal } from "react-dom"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { useToasts } from "@fex-design/react/hooks/use-toasts"
import { toast, type ReactToastItem, type ReactToastManager } from "./toast-manager"

const toastPlacements: ToastPlacement[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
]

export interface ToastViewportProps extends Omit<ComponentProps<"div">, "children"> {
  children: (items: ReactToastItem[]) => ReactNode
  container?: Element | DocumentFragment | null
  manager?: ReactToastManager
  offset?: number | string
  placement?: ToastPlacement
  stack?: boolean
  stackThreshold?: number
}

export function ToastViewport({
  children,
  className,
  container,
  manager = toast,
  offset = 24,
  placement,
  stack = false,
  stackThreshold = 3,
  style,
  ...props
}: ToastViewportProps) {
  const { items } = useToasts(manager)
  const placements = placement ? [placement] : toastPlacements

  const content = (
    <>
      {placements.map((currentPlacement) => {
        const placementItems = items.filter((item) => item.placement === currentPlacement)
        const stacked = stack && placementItems.length > stackThreshold
        const renderedItems = stacked ? placementItems.slice(-1) : placementItems
        if (placementItems.length === 0) return null

        return (
          <div
            key={currentPlacement}
            data-slot="toast-viewport"
            className={cn(toastViewportClassName({ placement: currentPlacement }), className)}
            style={
              {
                "--toast-offset": typeof offset === "number" ? `${offset}px` : offset,
                ...style,
              } as CSSProperties
            }
            {...props}
          >
            <div className={toastStackContainerClassName({ placement: currentPlacement })}>
              {stacked ? (
                <>
                  <div
                    aria-hidden="true"
                    className={cn(toastStackLayerClassName, "top-2 opacity-70")}
                  />
                  <div
                    aria-hidden="true"
                    className={cn(toastStackLayerClassName, "top-4 w-[calc(100%-32px)] opacity-40")}
                  />
                </>
              ) : null}
              <div className={toastStackItemsClassName({ placement: currentPlacement })}>
                {children(renderedItems)}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )

  const portalContainer = container ?? globalThis.document?.body
  return portalContainer ? createPortal(content, portalContainer) : content
}
