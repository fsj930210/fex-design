import type { ReactNode } from 'react'
import type { PopoverOptions, PopoverRenderState } from '@fex-design/core/popover/types'
import { useCoreStoreSelector } from '../../hooks/use-core-store-selector'
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

export function Popover({ children, ...options }: PopoverProps) {
  const context = usePopover(options)
  return <PopoverContext value={context}>
      {typeof children === 'function' ? <RenderContent>{children}</RenderContent> : children}
  </PopoverContext>
}

export { Popover as PopoverRoot }
export type PopoverRootProps = PopoverProps
export { usePopover } from './use-popover-controller'
export type { PopoverContextValue as PopoverBinding } from './popover-context'
export { usePopoverTrigger, usePopoverContent, usePopoverArrow } from './use-popover'
export type { PopoverOptions } from '@fex-design/core/popover/types'
export * from './popover-trigger'
export * from './popover-portal'
export * from './popover-content'
export * from './popover-arrow'
export * from './popover-header'
export * from './popover-title'
export * from './popover-description'
