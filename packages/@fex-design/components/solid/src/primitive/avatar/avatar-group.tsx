import { avatarGroupClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'

export interface AvatarGroupProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {}

export function AvatarGroup(props: AvatarGroupProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div
      {...rest}
      role="group"
      data-slot="avatar-group"
      class={cn(avatarGroupClassName, local.class)}
    >
      {local.children}
    </div>
  )
}
