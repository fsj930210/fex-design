import { useState, type ReactNode } from 'react'
import type { PopoverOptions, PopoverRenderState } from './utils'
import { useCoreStore } from '@/hooks/use-core-store'
import { useMemoizedFn } from '@/hooks/use-memoized-fn'
import { PopoverContext, usePopoverContext } from './popover-context'
import { usePopover } from './use-popover'

export interface PopoverProps extends PopoverOptions {
  children?: ReactNode | ((state: PopoverRenderState) => ReactNode)
}

function RenderContent({ children }: { children: (state: PopoverRenderState) => ReactNode }) {
  const { overlay } = usePopoverContext('Popover')
  const snapshot = useCoreStore(overlay)
  return children({ open: snapshot.open, close: overlay.close })
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
