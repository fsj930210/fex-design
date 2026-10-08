import { avatarFallbackClassName } from '@fex-design/components-styles/avatar'
import type { ImageLoadingStatus } from '@fex-design/core/image/types'
import { cn } from '@fex-design/utils'
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from 'react'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends ComponentProps<'span'> {
  delayMs?: number
}

export function AvatarFallback({ delayMs, className, children, ...props }: AvatarFallbackProps) {
  const { controller } = useAvatarContext('AvatarFallback')
  const status = useSyncExternalStore(
    controller.subscribe,
    controller.getStatus,
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
