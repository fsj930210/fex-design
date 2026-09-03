import { cva } from 'class-variance-authority'

export const skeletonBaseClassName = 'shrink-0 bg-muted-background motion-reduce:animate-none'

export const skeletonAnimationClassName =
  'animate-[skeleton-loading_1.4s_ease_infinite] bg-[linear-gradient(90deg,var(--skeleton-gradient-from)_25%,var(--skeleton-gradient-to)_37%,var(--skeleton-gradient-from)_63%)] bg-[length:400%_100%] motion-reduce:animate-none'

export const skeletonAnimationVariants = cva('', {
  variants: {
    animation: {
      none: '',
      pulse: 'animate-pulse',
      wave:
        'animate-[skeleton-loading_1.4s_ease_infinite] bg-[linear-gradient(90deg,var(--skeleton-gradient-from)_25%,var(--skeleton-gradient-to)_37%,var(--skeleton-gradient-from)_63%)] bg-[length:400%_100%]',
    },
  },
  defaultVariants: { animation: 'none' },
})

export const skeletonBlockClassName = 'rounded-md'
export const skeletonTextClassName = 'h-4 w-full rounded-sm'

export const skeletonAvatarClassName = cva('', {
  variants: {
    size: {
      sm: 'size-[var(--avatar-size,var(--avatar-size-sm,1.5rem))]',
      md: 'size-[var(--avatar-size,var(--avatar-size-md,2rem))]',
      lg: 'size-[var(--avatar-size,var(--avatar-size-lg,2.5rem))]',
    },
    shape: { circle: 'rounded-full', square: 'rounded-md' },
  },
  defaultVariants: { size: 'md', shape: 'circle' },
})

export const skeletonButtonClassName = cva('w-20 rounded-md', {
  variants: {
    size: {
      xs: 'h-[var(--button-height-xs,var(--height-xs))]',
      sm: 'h-[var(--button-height-sm,var(--height-sm))]',
      default: 'h-[var(--button-height-default,var(--height-default))]',
      lg: 'h-[var(--button-height-lg,var(--height-lg))]',
      xl: 'h-[var(--button-height-xl,var(--height-xl))]',
    },
    shape: {
      round: 'rounded-full',
      square: 'aspect-square w-auto',
      circle: 'aspect-square w-auto rounded-full',
    },
    block: { true: 'w-full', false: '' },
  },
  compoundVariants: [
    { shape: 'square', block: true, class: 'aspect-auto' },
    { shape: 'circle', block: true, class: 'aspect-auto' },
  ],
  defaultVariants: { size: 'default', block: false },
})

export const skeletonInputClassName =
  'h-[var(--input-height-default,var(--height-default))] w-64 rounded-md'
export const skeletonInputBlockClassName = 'w-full'
export const skeletonImageClassName =
  'flex aspect-square w-24 items-center justify-center rounded-md text-muted-foreground/70 [&_svg]:size-8'

export const skeletonRootClassName = 'flex w-full items-start gap-3'
export const skeletonAvatarAreaClassName = 'shrink-0'
export const skeletonBodyClassName = 'grid min-w-0 flex-1'
export const skeletonTitleClassName = 'mb-4 h-4 w-[38%]'
export const skeletonParagraphClassName = 'grid gap-2'
