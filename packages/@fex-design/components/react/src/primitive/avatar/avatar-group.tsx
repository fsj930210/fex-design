import { avatarGroupClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export interface AvatarGroupProps extends ComponentProps<'div'> {}

export function AvatarGroup({ className, children, ...props }: AvatarGroupProps) {
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
