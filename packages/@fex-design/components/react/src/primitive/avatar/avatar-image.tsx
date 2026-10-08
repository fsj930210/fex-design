import { avatarImageClassName } from '@fex-design/components-styles/avatar'
import type { ImageLoadingStatus } from '@fex-design/core/image/types'
import { cn } from '@fex-design/utils'
import {
  useEffect,
  useSyncExternalStore,
  type ComponentProps,
} from 'react'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends ComponentProps<'img'> {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

export function AvatarImage({ src, className, onLoadingStatusChange, ...props }: AvatarImageProps) {
  const { controller } = useAvatarContext('AvatarImage')
  const status = useSyncExternalStore(
    controller.subscribe,
    controller.getStatus,
    () => 'idle' as ImageLoadingStatus,
  )
  useEffect(() => {
    if (src)
      controller.load({
        src,
        ...(props.crossOrigin ? { crossOrigin: props.crossOrigin } : {}),
        ...(props.referrerPolicy ? { referrerPolicy: props.referrerPolicy } : {}),
      })
    else controller.reset()
  }, [controller, src, props.crossOrigin, props.referrerPolicy])
  useEffect(() => onLoadingStatusChange?.(status), [onLoadingStatusChange, status])
  return status === 'loaded' ? (
    <img
      {...props}
      src={src}
      data-slot="avatar-image"
      className={cn(avatarImageClassName, className)}
    />
  ) : null
}
