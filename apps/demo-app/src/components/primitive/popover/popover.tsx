import { useState, type ReactNode } from 'react'
import type { PopoverOptions, PopoverRenderState } from './utils'
import { useCoreStoreSelector } from '@/hooks/use-core-store-selector'
import { useMemoizedFn } from '@/hooks/use-memoized-fn'
import { selectOpen } from './selectors'
import { PopoverContext, usePopoverContext } from './popover-context'
import { usePopover } from './use-popover-controller'

export interface PopoverProps extends PopoverOptions {
  children?: ReactNode | ((state: PopoverRenderState) => ReactNode)
}

function RenderContent({ children }: { children: (state: PopoverRenderState) => ReactNode }) {
  const { overlay } = usePopoverContext('Popover')
  const open = useCoreStoreSelector(overlay, selectOpen)
  return children({ open, close: overlay.close })
}

export function Popover({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...config
}: PopoverProps) {
  const controlled = openProp !== undefined
  const [localOpen, setLocalOpen] = useState(defaultOpen ?? false)
  const handleOpenChange = useMemoizedFn<NonNullable<PopoverOptions['onOpenChange']>>(
    (open, info) => {
      if (!controlled) setLocalOpen(open)
      onOpenChange?.(open, info)
    },
  )
  const options: PopoverOptions = {
    ...config,
    open: controlled ? openProp : localOpen,
    onOpenChange: handleOpenChange,
  }
  const context = usePopover(options)
  return (
    <PopoverContext value={context}>
      {typeof children === 'function' ? <RenderContent>{children}</RenderContent> : children}
    </PopoverContext>
  )
}

export { Popover as PopoverRoot }
export type PopoverRootProps = PopoverProps
export { usePopover } from './use-popover-controller'
export type { PopoverContextValue as PopoverBinding } from './popover-context'
export { usePopoverTrigger, usePopoverContent, usePopoverArrow } from './use-popover'
export type { PopoverOptions } from './utils'
export * from './popover-trigger'
export * from './popover-portal'
export * from './popover-content'
export * from './popover-arrow'
export * from './popover-header'
export * from './popover-title'
export * from './popover-description'
