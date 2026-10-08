import { avatarImageClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  Show,
  splitProps,
  type JSX,
} from 'solid-js'
import { useAvatarContext } from './avatar-context'

export function AvatarImage(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, rest] = splitProps(props, ['class', 'src', 'crossorigin', 'referrerpolicy'])
  const context = useAvatarContext('AvatarImage')
  createEffect(() =>
    local.src
      ? context.controller.load({
          src: local.src,
          ...(local.crossorigin ? { crossOrigin: local.crossorigin } : {}),
          ...(local.referrerpolicy ? { referrerPolicy: local.referrerpolicy } : {}),
        })
      : context.controller.reset(),
  )
  return (
    <Show when={context.status() === 'loaded'}>
      <img
        {...rest}
        src={local.src}
        data-slot="avatar-image"
        class={cn(avatarImageClassName, local.class)}
      />
    </Show>
  )
}
