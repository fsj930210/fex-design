import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
import { shallowEqualObject } from '@fex-design/utils'
import type { ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { usePopoverContext } from './popover-context'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { selectPortal } from './selectors'

export interface PopoverPortalProps extends Omit<PopoverPortalOptions, 'container'> {
  container?: HTMLElement | RefObject<HTMLElement | null> | null | undefined
  children?: ReactNode
}

export function PopoverPortal({ children, container }: PopoverPortalProps) {
  const { overlay } = usePopoverContext('PopoverPortal')
  const snapshot = useCoreStoreSelector(overlay, selectPortal, shallowEqualObject)
  const popupContainer =
    (container && 'current' in container ? container.current : container) ?? snapshot.popupContainer

  if (!popupContainer || !snapshot.mounted) {
    return null
  }

  return createPortal(children, popupContainer)
}
