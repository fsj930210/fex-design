import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
import { createMemo, Show, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { usePopover } from './popover-context'

export function PopoverPortal(props: ParentProps<PopoverPortalOptions>) {
  const { snapshot } = usePopover('PopoverPortal')
  const container = createMemo(() => props.container ?? snapshot().popupContainer)
  return (
    <Show when={snapshot().mounted && container()}>
      <Portal
        mount={container() ?? undefined}
        ref={(element) => {
          element.style.display = 'contents'
        }}
      >
        {props.children}
      </Portal>
    </Show>
  )
}
