import type { ReactNode } from 'react'
import type { PopoverOptions, PopoverRenderState } from './utils'
import { useCoreStore } from '@demo/hooks/use-core-store'
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

export function Popover({ children, ...options }: PopoverProps) {
  const context = usePopover(options)
  return (
    <PopoverContext value={context}>
      {typeof children === 'function' ? <RenderContent>{children}</RenderContent> : children}
    </PopoverContext>
  )
}

export { Popover as PopoverRoot }
export type PopoverRootProps = PopoverProps
