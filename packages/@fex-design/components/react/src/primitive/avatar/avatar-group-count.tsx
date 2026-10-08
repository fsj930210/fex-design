import { avatarGroupOverflowClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

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
