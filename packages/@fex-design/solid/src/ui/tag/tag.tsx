import type { TagUiOptions } from '@fex-design/core/tag/types'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import {
  Tag as PrimitiveTag,
  TagAction,
  type TagProps as PrimitiveTagProps,
} from '../../primitive/tag/tag'

export type { TagActionProps } from '../../primitive/tag/tag'
export { TagAction } from '../../primitive/tag/tag'

export type TagProps = PrimitiveTagProps &
  TagUiOptions<JSX.Element, JSX.CSSProperties> & {
    onClose?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  }

export function Tag(props: TagProps) {
  const [local, rest] = splitProps(props, [
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
      style={{ ...(typeof local.style === 'object' ? local.style : {}), ...local.styles?.root }}
    >
      {local.children}
      {local.closable ? (
        <TagAction
          disabled={local.disabled}
          aria-label="Close"
          class={local.classNames?.close}
          style={local.styles?.close}
          onClick={local.onClose}
        >
          {local.closeIcon}
        </TagAction>
      ) : null}
    </PrimitiveTag>
  )
}
