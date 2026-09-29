import { useId, useRef, useState, type ReactNode } from "react"
import {
  createTooltip,
  type TooltipOptions,
} from "@fex-design/core/tooltip/create-tooltip"
import { shallowEqualObject } from "@fex-design/utils"
import { useIsomorphicLayoutEffect } from "@fex-design/react/hooks/use-isomorphic-layout-effect"
import { useLazyRef } from "@fex-design/react/hooks/use-lazy-ref"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import useUnmount from "@fex-design/react/hooks/use-unmount"
import { TooltipContext } from "./tooltip-context"

export interface TooltipRootProps extends TooltipOptions {
  children?: ReactNode
}

export function TooltipRoot({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...config
}: TooltipRootProps) {
  const controlled = openProp !== undefined
  const [localOpen, setLocalOpen] = useState(defaultOpen ?? false)
  const handleOpenChange = useMemoizedFn<NonNullable<TooltipOptions["onOpenChange"]>>(
    (open, info) => {
      if (!controlled) setLocalOpen(open)
      onOpenChange?.(open, info)
    },
  )
  const options: TooltipOptions = {
    ...config,
    open: controlled ? openProp : localOpen,
    onOpenChange: handleOpenChange,
  }
  const overlayRef = useLazyRef(() => createTooltip(options))
  const latestOptions = useRef(options)
  const triggerRef = useRef<HTMLElement | null>(null)
  const contentId = `tooltip-${useId().replaceAll(":", "")}`
  const overlay = overlayRef.current
  useIsomorphicLayoutEffect(() => {
    if (shallowEqualObject(latestOptions.current, options)) return
    latestOptions.current = options
    overlay.setOptions(options)
  })
  useUnmount(() => overlay.destroy())
  return <TooltipContext value={{ contentId, overlay, triggerRef }}>{children}</TooltipContext>
}

export { TooltipRoot as Tooltip }
export type TooltipProps = TooltipRootProps
