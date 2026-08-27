import { cva } from 'class-variance-authority'

export const spinnerClassName = cva('inline-block shrink-0 text-current', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const spinnerContainerClassName = 'relative h-full'

export const spinnerOverlayClassName =
  'absolute inset-0 z-10 flex items-center justify-center gap-2 bg-background/70 backdrop-blur-[1px]'

export const spinnerTextClassName = 'text-sm'
