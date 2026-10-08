import {
  avatarClassName,
  type AvatarStyleProps,
} from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { loadImage } from '@fex-design/utils/image/load-image'
import {
  createSignal,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { AvatarContext } from './avatar-context'

export interface AvatarProps extends ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>, AvatarStyleProps {}

export function Avatar(props: AvatarProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'size', 'shape'])
  const controller = createImageLoadingController(loadImage)
  const [status, setStatus] = createSignal(controller.getStatus())
  controller.subscribe(() => setStatus(controller.getStatus()))
  return (
    <AvatarContext.Provider value={{ status, controller }}>
      <span
        {...rest}
        data-slot="avatar"
        data-size={local.size ?? 'md'}
        data-shape={local.shape ?? 'circle'}
        class={cn(avatarClassName({ size: local.size, shape: local.shape }), local.class)}
      >
        {local.children}
      </span>
    </AvatarContext.Provider>
  )
}

export { Avatar as AvatarRoot, type AvatarProps as AvatarRootProps }
