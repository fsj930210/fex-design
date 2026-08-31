import {
  avatarBadgeClassName,
  avatarClassName,
  avatarFallbackClassName,
  avatarGroupClassName,
  avatarGroupOverflowClassName,
  avatarImageClassName,
  type AvatarStyleProps,
} from '@fex-design/styles/avatar'
import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import type { ImageLoadingStatus } from '@fex-design/core/image/types'
import { loadImage } from '@fex/utils/image/load-image'
import { cn } from '@fex/utils'
import {
  createContext,
  use,
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from 'react'

interface AvatarContextValue {
  controller: ReturnType<typeof createImageLoadingController>
}

const AvatarContext = createContext<AvatarContextValue | null>(null)

export function Avatar({
  size = 'md',
  shape = 'circle',
  className,
  children,
  ...props
}: ComponentProps<'span'> & AvatarStyleProps) {
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

export interface AvatarImageProps extends ComponentProps<'img'> {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

export function AvatarImage({ src, className, onLoadingStatusChange, ...props }: AvatarImageProps) {
  const context = use(AvatarContext)
  if (!context) throw new Error('AvatarImage must be used inside Avatar')
  const { controller } = context
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

export interface AvatarFallbackProps extends ComponentProps<'span'> {
  delayMs?: number
}

export function AvatarFallback({ delayMs, className, children, ...props }: AvatarFallbackProps) {
  const context = use(AvatarContext)
  if (!context) throw new Error('AvatarFallback must be used inside Avatar')
  const status = useSyncExternalStore(
    context.controller.subscribe,
    context.controller.getStatus,
    () => 'idle' as ImageLoadingStatus,
  )
  const [canRender, setCanRender] = useState(delayMs === undefined)
  useEffect(() => {
    if (delayMs === undefined) return
    const timer = window.setTimeout(() => setCanRender(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])
  return canRender && status !== 'loaded' ? (
    <span {...props} data-slot="avatar-fallback" className={cn(avatarFallbackClassName, className)}>
      {children}
    </span>
  ) : null
}

export function AvatarBadge({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span {...props} data-slot="avatar-badge" className={cn(avatarBadgeClassName, className)}>
      {children}
    </span>
  )
}

export function AvatarGroup({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      role="group"
      data-slot="avatar-group"
      className={cn(avatarGroupClassName, className)}
    >
      {children}
    </div>
  )
}

export function AvatarGroupCount({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      data-slot="avatar-group-count"
      className={cn(avatarGroupOverflowClassName, className)}
    >
      {children}
    </span>
  )
}
