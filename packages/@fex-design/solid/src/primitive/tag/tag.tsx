import {
  isTagPresetColor,
  type TagOptions,
  type TagPresetColor,
} from '@fex-design/core/tag/types'
import { tagClassName, tagCloseClassName } from '@fex-design/styles/tag'
import { cn } from '@fex/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { CloseIcon } from '../../icon/close'

type TagStyle = JSX.CSSProperties & {
  '--tag-color'?: string
  '--tag-color-foreground'?: string
}

export interface TagProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'color'>>,
    TagOptions {}

export function Tag(props: TagProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'color',
    'variant',
    'size',
    'disabled',
  ])
  const presetColor = (): TagPresetColor | undefined =>
    isTagPresetColor(local.color) ? local.color : undefined
  const style = (): TagStyle => ({
    ...(local.color && !presetColor() ? { '--tag-color': local.color } : undefined),
    ...(typeof local.style === 'object' ? local.style : {}),
  })
  return (
    <span
      {...rest}
      data-slot="tag"
      data-color={presetColor() ?? (local.color ? 'custom' : undefined)}
      data-variant={local.variant ?? 'filled'}
      data-size={local.size ?? 'md'}
      data-disabled={local.disabled ? 'true' : undefined}
      class={cn(
        tagClassName({
          variant: local.variant ?? 'filled',
          color: presetColor(),
          size: local.size ?? 'md',
        }),
        local.class,
      )}
      style={style()}
    />
  )
}

export interface TagCloseProps extends ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>> {}

export function TagClose(props: TagCloseProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'type', 'aria-label'])
  return (
    <button
      {...rest}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? 'Close'}
      data-slot="tag-close"
      class={cn(tagCloseClassName, local.class)}
    >
      {local.children ?? <CloseIcon aria-hidden />}
    </button>
  )
}
