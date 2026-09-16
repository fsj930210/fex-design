import { Show, splitProps, type JSX } from 'solid-js'
import type {
  TooltipClassNames,
  TooltipOptions,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
import { cn } from '@fex/utils'
import { tooltipOptionKeys } from '@fex-design/core/tooltip/options'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
  type TooltipTriggerRenderProps,
} from '../../primitive/tooltip/tooltip'

export type TooltipProps = TooltipOptions &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'color'> & {
    children: (props: TooltipTriggerRenderProps) => JSX.Element
    title: JSX.Element
    color?: string
    arrow?: boolean
    classNames?: TooltipClassNames
    styles?: Partial<Record<TooltipSemanticPart, JSX.CSSProperties>>
  }

export function Tooltip(props: TooltipProps) {
  const [local, options, nativeProps] = splitProps(
    props,
    ['children', 'title', 'color', 'arrow', 'class', 'style', 'classNames', 'styles'],
    tooltipOptionKeys,
  )
  const rootStyle = () => ({
    ...(typeof local.style === 'object' ? local.style : {}),
    ...local.styles?.root,
  })
  return (
    <TooltipRoot {...options}>
      <TooltipTrigger>{local.children}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          {...nativeProps}
          color={local.color}
          class={cn(local.class, local.classNames?.root)}
          style={rootStyle()}
        >
          {local.title}
          <Show when={local.arrow ?? true}>
            <TooltipArrow class={local.classNames?.arrow} style={local.styles?.arrow} />
          </Show>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  )
}

export { useTooltip } from '../../primitive/tooltip/tooltip-context'
export type {
  TooltipOptions,
  TooltipClassNames,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
