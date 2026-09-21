import { cva } from 'class-variance-authority'

export const anchorRootClassName = cva('relative block', {
  variants: {
    orientation: {
      vertical: 'ps-4 [--anchor-indent:1.5rem]',
      horizontal: 'pb-2',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export const anchorListClassName = cva('m-0 list-none p-0', {
  variants: {
    orientation: {
      vertical: 'grid gap-1',
      horizontal: 'flex max-w-full items-center gap-1 overflow-x-auto',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export const anchorItemClassName =
  '[&>[data-slot=anchor-list]]:mt-1 [&>[data-slot=anchor-list]]:ps-[var(--anchor-indent)]'

export const anchorLinkClassName = cva(
  'inline-flex max-w-full cursor-pointer items-center rounded-md px-2 py-1 text-left text-sm leading-5 whitespace-nowrap text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      orientation: { vertical: 'w-full justify-start', horizontal: 'justify-center' },
      active: { true: 'font-medium text-primary hover:text-primary', false: '' },
    },
    defaultVariants: { orientation: 'vertical', active: false },
  },
)

export const anchorRailClassName = cva('pointer-events-none absolute rounded-full bg-border', {
  variants: {
    orientation: { vertical: 'inset-y-0 start-0 w-px', horizontal: 'inset-x-0 bottom-0 h-px' },
  },
  defaultVariants: { orientation: 'vertical' },
})

export const anchorIndicatorClassName = cva(
  'absolute rounded-full bg-primary transition-all duration-200 ease-out',
  {
    variants: {
      orientation: { vertical: 'start-0 w-0.5', horizontal: 'bottom-0 h-0.5' },
    },
    defaultVariants: { orientation: 'vertical' },
  },
)
