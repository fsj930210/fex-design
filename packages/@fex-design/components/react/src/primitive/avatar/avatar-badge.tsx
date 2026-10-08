import { avatarBadgeClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function AvatarBadge({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span {...props} data-slot="avatar-badge" className={cn(avatarBadgeClassName, className)}>
      {children}
    </span>
  )
}
