import {
  cloneElement,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import type {
  TooltipClassNames,
  TooltipOptions,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
import { splitTooltipOptions } from '@fex-design/core/tooltip/options'
import { cn } from '@fex/utils'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  useTooltipTrigger,
} from '../../primitive/tooltip/tooltip'

export interface TooltipProps
  extends TooltipOptions, Omit<ComponentProps<'div'>, 'children' | 'title' | 'color'> {
  children: ReactElement<ComponentProps<'button'>>
  title: ReactNode
  color?: string
  arrow?: boolean
  classNames?: TooltipClassNames
  styles?: Partial<Record<TooltipSemanticPart, CSSProperties>>
}

function Trigger({ children }: Pick<TooltipProps, 'children'>) {
  const trigger = useTooltipTrigger(children.props)
  return cloneElement(children, trigger.props)
}

export function Tooltip(props: TooltipProps) {
  const [options, contentProps] = splitTooltipOptions(props)
  const {
    children,
    title,
    color,
    arrow = true,
    className,
    style,
    classNames,
    styles,
    ...nativeProps
  } = contentProps
  const rootStyle = { ...style, ...styles?.root }
  return (
    <TooltipRoot {...options}>
      <Trigger>{children}</Trigger>
      <TooltipPortal>
        <TooltipContent
          {...nativeProps}
          color={color}
          className={cn(className, classNames?.root)}
          style={rootStyle}
        >
          {title}
          {arrow ? <TooltipArrow className={classNames?.arrow} style={styles?.arrow} /> : null}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  )
}

export { useTooltip } from '../../primitive/tooltip/tooltip'
export type {
  TooltipOptions,
  TooltipClassNames,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
