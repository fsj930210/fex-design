import { cva } from 'class-variance-authority'

export interface AvatarStyleProps {
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
}

export const avatarClassName = cva(
  'group/avatar relative inline-flex shrink-0 items-center justify-center bg-muted-background text-muted-foreground select-none',
  {
    variants: {
      size: {
        sm: 'size-[var(--avatar-size,var(--avatar-size-sm,1.5rem))] text-xs',
        md: 'size-[var(--avatar-size,var(--avatar-size-md,2rem))] text-sm',
        lg: 'size-[var(--avatar-size,var(--avatar-size-lg,2.5rem))] text-sm',
      },
      shape: { circle: 'rounded-full', square: 'rounded-md' },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  },
)
export const avatarImageClassName = 'size-full rounded-[inherit] object-cover'
export const avatarImageHostClassName = 'contents rounded-[inherit]'
export const avatarFallbackClassName =
  'flex size-full items-center justify-center overflow-hidden rounded-[inherit] font-medium'
export const avatarBadgeClassName =
  'absolute end-0 bottom-0 z-10 inline-flex size-2.5 items-center justify-center rounded-full bg-success ring-2 ring-background group-data-[size=sm]/avatar:size-2 group-data-[size=lg]/avatar:size-3'
export const avatarGroupClassName =
  'group/avatar-group inline-flex items-center [--avatar-group-overlap:0.75rem] [&>*+*]:-ms-[var(--avatar-group-overlap)] [&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar-group-count]]:ring-2 [&>[data-slot=avatar-group-count]]:ring-background [&>[data-slot=avatar]]:ring-background'
export const avatarGroupOverflowClassName =
  'relative inline-flex size-[var(--avatar-size,var(--avatar-size-md,2rem))] shrink-0 items-center justify-center rounded-full bg-muted-background text-sm font-medium text-muted-foreground ring-2 ring-background [&>svg]:size-4 group-has-data-[shape=square]/avatar-group:rounded-md group-has-data-[size=lg]/avatar-group:size-[var(--avatar-size,var(--avatar-size-lg,2.5rem))] group-has-data-[size=sm]/avatar-group:size-[var(--avatar-size,var(--avatar-size-sm,1.5rem))]'
