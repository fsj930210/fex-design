import { Show, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useTooltip } from './tooltip-context'

export function TooltipPortal(props: ParentProps) {
  const { overlay, snapshot } = useTooltip('TooltipPortal')
  return (
    <Show when={snapshot().mounted}>
      <Portal mount={overlay.resolvePopupContainer() ?? document.body}>{props.children}</Portal>
    </Show>
  )
}
