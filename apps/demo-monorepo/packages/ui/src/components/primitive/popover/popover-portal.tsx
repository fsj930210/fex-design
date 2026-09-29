import type { PopoverPortalOptions } from './utils'
import type { ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { usePopoverContext } from './popover-context'
import { useCoreStore } from '@demo/hooks/use-core-store'

export interface PopoverPortalProps extends Omit<PopoverPortalOptions, 'container'> {
  container?: HTMLElement | RefObject<HTMLElement | null> | null | undefined
  children?: ReactNode
}

export function PopoverPortal({ children, container }: PopoverPortalProps) {
  const { overlay } = usePopoverContext('PopoverPortal')
  const snapshot = useCoreStore(overlay)
  const popupContainer =
    (container && 'current' in container ? container.current : container) ?? snapshot.popupContainer

  if (!popupContainer || !snapshot.mounted) {
    return null
  }

  return createPortal(children, popupContainer)
}
