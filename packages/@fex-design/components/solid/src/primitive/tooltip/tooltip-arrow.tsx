import { onCleanup, type JSX } from 'solid-js'
import { getTooltipArrowPosition } from '@fex-design/core/tooltip/create-tooltip'
import { tooltipArrowClassName } from '@fex-design/components-styles/tooltip'
import { cn } from '@fex-design/utils'
import { useTooltip } from './tooltip-context'

export function TooltipArrow(props: { class?: string; style?: JSX.CSSProperties }) {
  const { overlay, snapshot } = useTooltip('TooltipArrow')
  onCleanup(() => overlay.setArrowElement(null))
  const style = () => getTooltipArrowPosition(snapshot().side, snapshot().align)
  return (
    <div
      ref={(element) => overlay.setArrowElement(element)}
      data-slot="tooltip-arrow"
      data-side={snapshot().side}
      data-align={snapshot().align}
      class={cn(tooltipArrowClassName, props.class)}
      style={{ ...style(), ...props.style }}
    />
  )
}
