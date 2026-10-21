import { cva } from 'class-variance-authority'

const textSizes = {
  sm: 'text-[length:var(--pagination-font-size,0.75rem)]',
  md: 'text-[length:var(--pagination-font-size,0.875rem)]',
  lg: 'text-[length:var(--pagination-font-size,1rem)]',
}
const controlSizes = {
  sm: `h-[var(--pagination-control-height,var(--height-sm))] min-w-[var(--pagination-control-height,var(--height-sm))] px-1 ${textSizes.sm}`,
  md: `h-[var(--pagination-control-height,var(--height-md))] min-w-[var(--pagination-control-height,var(--height-md))] px-2 ${textSizes.md}`,
  lg: `h-[var(--pagination-control-height,var(--height-lg))] min-w-[var(--pagination-control-height,var(--height-lg))] px-3 ${textSizes.lg}`,
}
export const paginationRootClassName = cva(
  'flex max-w-full flex-wrap items-center gap-[var(--pagination-gap,0.5rem)]',
  {
    variants: { size: textSizes },
    defaultVariants: { size: 'md' },
  },
)
export const paginationContentClassName =
  'flex shrink-0 items-center gap-[var(--pagination-item-gap,0.125rem)]'
export const paginationButtonClassName = cva(
  'inline-flex shrink-0 items-center justify-center rounded-[var(--pagination-radius,var(--radius-md))] border border-transparent text-[var(--pagination-color,var(--foreground))] transition-colors hover:bg-[var(--pagination-hover-background,var(--muted-background))] focus-visible:outline-none focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:border-[var(--pagination-active-border-color,var(--border))] data-[active=true]:bg-[var(--pagination-active-background,var(--background))] data-[active=true]:text-[var(--pagination-active-color,var(--foreground))] [&_svg]:size-4',
  { variants: { size: controlSizes }, defaultVariants: { size: 'md' } },
)
export const paginationEllipsisClassName = cva(
  'inline-flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4',
  {
    variants: { size: controlSizes },
    defaultVariants: { size: 'md' },
  },
)
export const paginationSelectTriggerClassName = cva(
  'w-full rounded-[var(--pagination-radius,var(--radius-md))]',
  {
    variants: {
      size: {
        sm: `h-[var(--pagination-control-height,var(--height-sm))] min-h-[var(--pagination-control-height,var(--height-sm))] px-2 py-0 ${textSizes.sm}`,
        md: `h-[var(--pagination-control-height,var(--height-md))] min-h-[var(--pagination-control-height,var(--height-md))] px-3 py-1 ${textSizes.md}`,
        lg: `h-[var(--pagination-control-height,var(--height-lg))] min-h-[var(--pagination-control-height,var(--height-lg))] px-4 py-1.5 ${textSizes.lg}`,
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const paginationInputControlClassName = cva(
  'rounded-[var(--pagination-radius,var(--radius-md))]',
  {
    variants: {
      size: {
        sm: `h-[var(--pagination-control-height,var(--height-sm))] ${textSizes.sm}`,
        md: `h-[var(--pagination-control-height,var(--height-md))] ${textSizes.md}`,
        lg: `h-[var(--pagination-control-height,var(--height-lg))] ${textSizes.lg}`,
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const paginationPageSizeSelectClassName = 'inline-flex min-w-28 shrink-0 items-center'
export const paginationQuickJumperClassName = 'inline-flex w-20 shrink-0 items-center'
export const paginationTotalClassName = 'shrink-0 text-muted-foreground'
export const paginationSimpleClassName = 'min-w-12 text-center tabular-nums'
export const paginationJumperGroupClassName =
  'inline-flex shrink-0 items-center gap-2 whitespace-nowrap'
export const paginationHideOnSinglePageClassName =
  'data-[page-count=0]:hidden data-[page-count=1]:hidden'
