import {
  avatarBadgeClassName,
  avatarClassName,
  avatarFallbackClassName,
  avatarImageClassName,
  avatarGroupClassName,
  avatarGroupOverflowClassName,
  type AvatarStyleProps,
} from '@fex-design/styles/avatar'
import { cn } from '@fex/utils'
import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { loadImage } from '@fex/utils/image/load-image'
import {
  createContext,
  createEffect,
  createSignal,
  Show,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
const Context = createContext<{
  status: () => string
  controller: ReturnType<typeof createImageLoadingController>
}>()
export function Avatar(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>> & AvatarStyleProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'size', 'shape'])
  const controller = createImageLoadingController(loadImage)
  const [status, setStatus] = createSignal(controller.getStatus())
  controller.subscribe(() => setStatus(controller.getStatus()))
  return (
    <Context.Provider value={{ status, controller }}>
      <span
        {...rest}
        data-slot="avatar"
        data-size={local.size ?? 'md'}
        data-shape={local.shape ?? 'circle'}
        class={cn(avatarClassName({ size: local.size, shape: local.shape }), local.class)}
      >
        {local.children}
      </span>
    </Context.Provider>
  )
}

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
export interface AvatarGroupProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {}
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
export function AvatarImage(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, rest] = splitProps(props, ['class', 'src', 'crossorigin', 'referrerpolicy'])
  const context = useContext(Context)
  createEffect(() =>
    local.src
      ? context?.controller.load({
          src: local.src,
          ...(local.crossorigin ? { crossOrigin: local.crossorigin } : {}),
          ...(local.referrerpolicy ? { referrerPolicy: local.referrerpolicy } : {}),
        })
      : context?.controller.reset(),
  )
  return (
    <Show when={context?.status() === 'loaded'}>
      <img
        {...rest}
        src={local.src}
        data-slot="avatar-image"
        class={cn(avatarImageClassName, local.class)}
      />
    </Show>
  )
}
export function AvatarFallback(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const context = useContext(Context)
  return (
    <Show when={context?.status() !== 'loaded'}>
      <span {...rest} data-slot="avatar-fallback" class={cn(avatarFallbackClassName, local.class)}>
        {local.children}
      </span>
    </Show>
  )
}
export function AvatarBadge(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <span {...rest} data-slot="avatar-badge" class={cn(avatarBadgeClassName, local.class)}>
      {local.children}
    </span>
  )
}
