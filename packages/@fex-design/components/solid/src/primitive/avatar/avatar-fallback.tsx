import { avatarFallbackClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import {
  Show,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { useAvatarContext } from './avatar-context'

export function AvatarFallback(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const context = useAvatarContext('AvatarFallback')
  return (
    <Show when={context.status() !== 'loaded'}>
      <span {...rest} data-slot="avatar-fallback" class={cn(avatarFallbackClassName, local.class)}>
        {local.children}
      </span>
    </Show>
  )
}
