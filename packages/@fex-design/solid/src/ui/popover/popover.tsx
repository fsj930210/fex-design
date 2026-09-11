import { Show, splitProps, type JSX } from 'solid-js'
import type { PopoverClassNames, PopoverOptions, PopoverSemanticPart } from '@fex-design/core/popover/types'
import { popoverOptionKeys } from '@fex-design/core/popover/options'
import { cn } from '@fex/utils'
import {
  Popover as PrimitivePopover, PopoverArrow, PopoverContent, PopoverHeader,
  PopoverPortal, PopoverTitle, PopoverTrigger, type PopoverTriggerProps,
} from '../../primitive/popover/popover'
import { usePopover } from '../../primitive/popover/popover-context'

export type PopoverProps = PopoverOptions &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'content'> & {
    children: PopoverTriggerProps['children']
    title?: JSX.Element
    content?: JSX.Element | ((state: { readonly open: boolean; close: () => void }) => JSX.Element)
    classNames?: PopoverClassNames
    styles?: Partial<Record<PopoverSemanticPart, JSX.CSSProperties>>
  }

function Content(props: PopoverProps) {
  const { overlay, snapshot } = usePopover('PopoverContent')
  const state = { get open() { return snapshot().open }, close: overlay.close }
  return <>{typeof props.content === 'function' ? props.content(state) : props.content}</>
}

export function Popover(props: PopoverProps) {
  const [options, local, nativeProps] = splitProps(props, popoverOptionKeys,
    ['children', 'title', 'content', 'class', 'style', 'classNames', 'styles'])
  const rootStyle = () => typeof local.style === 'string'
    ? `${local.style};${Object.entries(local.styles?.root ?? {}).map(([key, value]) => `${key}:${value}`).join(';')}`
    : { ...local.style, ...local.styles?.root }
  return (
    <PrimitivePopover {...options}>
      <PopoverTrigger>{local.children}</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent {...nativeProps} class={cn(local.class, local.classNames?.root)} style={rootStyle()}>
          <PopoverArrow class={local.classNames?.arrow} style={local.styles?.arrow} />
          <Show when={local.title != null}>
            <PopoverHeader>
              <PopoverTitle class={local.classNames?.title} style={local.styles?.title}>{local.title}</PopoverTitle>
            </PopoverHeader>
          </Show>
          <div data-slot="popover-body" class={local.classNames?.content} style={local.styles?.content}>
            <Content {...props} />
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PrimitivePopover>
  )
}

export { createPopover } from '../../primitive/popover/create-popover'
export type { PopoverOptions, PopoverClassNames, PopoverSemanticPart } from '@fex-design/core/popover/types'
