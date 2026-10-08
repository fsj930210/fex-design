import {
  avatarClassName,
  type AvatarStyleProps,
} from '@fex-design/components-styles/avatar'
import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { loadImage } from '@fex-design/utils/image/load-image'
import { cn } from '@fex-design/utils'
import {
  useEffect,
  useState,
  type ComponentProps,
} from 'react'
import { AvatarContext } from './avatar-context'

export interface AvatarProps extends ComponentProps<'span'>, AvatarStyleProps {}

export function Avatar({
  size = 'md',
  shape = 'circle',
  className,
  children,
  ...props
}: AvatarProps) {
  const [controller] = useState(() => createImageLoadingController(loadImage))
  useEffect(() => () => controller.reset(), [controller])
  return (
    <AvatarContext value={{ controller }}>
      <span
        {...props}
        data-slot="avatar"
        data-size={size}
        data-shape={shape}
        className={cn(avatarClassName({ size, shape }), className)}
      >
        {children}
      </span>
    </AvatarContext>
  )
}

export { Avatar as AvatarRoot, type AvatarProps as AvatarRootProps }
