import { avatarGroupOverflowClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'

export function AvatarGroupCount(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <span
      {...rest}
      data-slot="avatar-group-count"
      class={cn(avatarGroupOverflowClassName, local.class)}
    >
      {local.children}
    </span>
  )
}
