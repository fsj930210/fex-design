import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
import { createMemo, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { usePopover } from './popover-context'

export function PopoverPortal(props: ParentProps<PopoverPortalOptions>) {
  const { snapshot } = usePopover('PopoverPortal')
  const container = createMemo(() => props.container ?? snapshot().popupContainer)
  return <Portal mount={container() ?? undefined}>{props.children}</Portal>
}
