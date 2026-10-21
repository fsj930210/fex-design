import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { TagUiOptions } from '@fex-design/core/tag/types'
import { cn } from '@fex-design/utils'
import { splitProps, type ComponentProps, type JSX } from 'solid-js'
import {
  Tag as PrimitiveTag,
  TagAction,
  type TagProps as PrimitiveTagProps,
} from '@fex-design/solid/primitive/tag'

export type { TagActionProps } from '@fex-design/solid/primitive/tag'
export { TagAction } from '@fex-design/solid/primitive/tag'

export type TagProps = PrimitiveTagProps &
  TagUiOptions<JSX.Element, JSX.CSSProperties> & {
    actionProps?:
      | Omit<ComponentProps<typeof TagAction>, 'children' | 'disabled' | 'onClick'>
      | undefined
    onClose?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  }

export function Tag(props: TagProps) {
  const [local, rest] = splitProps(props, [
    'actionProps',
    'children',
    'closable',
    'closeIcon',
    'onClose',
    'disabled',
    'class',
    'style',
    'classNames',
    'styles',
  ])
  return (
    <PrimitiveTag
      {...rest}
      disabled={local.disabled}
      class={cn(local.class, local.classNames?.root)}
      style={mergeStyle(local.style, local.styles?.root)}
    >
      {local.children}
      {local.closable ? (
        <TagAction
          {...local.actionProps}
          disabled={local.disabled}
          aria-label={local.actionProps?.['aria-label'] ?? 'Close'}
          class={cn(local.classNames?.close, local.actionProps?.class)}
          style={mergeStyle(local.styles?.close, local.actionProps?.style)}
          onClick={local.onClose}
        >
          {local.closeIcon}
        </TagAction>
      ) : null}
    </PrimitiveTag>
  )
}
