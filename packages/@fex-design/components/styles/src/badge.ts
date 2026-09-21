import { cva } from 'class-variance-authority'

export const badgeClassName = cva(
  'inline-flex h-[var(--badge-height,var(--badge-size-height))] min-w-[var(--badge-min-width,var(--badge-size-min-width))] w-fit shrink-0 items-center justify-center rounded-full border border-transparent bg-[var(--badge-color,var(--badge-semantic-color))] px-[var(--badge-padding-inline,var(--badge-size-padding-inline))] py-0 text-[length:var(--badge-font-size,var(--badge-size-font-size))] leading-none font-medium text-[var(--badge-color-foreground,var(--badge-semantic-color-foreground))] whitespace-nowrap',
  {
    variants: {
      color: {
        default:
          '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
        primary:
          '[--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
        danger:
          '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
        warning:
          '[--badge-semantic-color:var(--badge-color-warning,var(--color-warning))] [--badge-semantic-color-foreground:var(--badge-color-warning-foreground,var(--color-warning-foreground))]',
        success:
          '[--badge-semantic-color:var(--badge-color-success,var(--color-success))] [--badge-semantic-color-foreground:var(--badge-color-success-foreground,var(--color-success-foreground))]',
        info: '[--badge-semantic-color:var(--badge-color-info,var(--color-info))] [--badge-semantic-color-foreground:var(--badge-color-info-foreground,var(--color-info-foreground))]',
      },
      size: {
        sm: '[--badge-size-height:var(--badge-height-sm,1rem)] [--badge-size-min-width:var(--badge-min-width-sm,var(--badge-height-sm,1rem))] [--badge-size-padding-inline:var(--badge-padding-inline-sm,0.25rem)] [--badge-size-font-size:var(--badge-font-size-sm,0.625rem)]',
        md: '[--badge-size-height:var(--badge-height-md,1.25rem)] [--badge-size-min-width:var(--badge-min-width-md,var(--badge-height-md,1.25rem))] [--badge-size-padding-inline:var(--badge-padding-inline-md,0.375rem)] [--badge-size-font-size:var(--badge-font-size-md,0.75rem)]',
        lg: '[--badge-size-height:var(--badge-height-lg,1.5rem)] [--badge-size-min-width:var(--badge-min-width-lg,var(--badge-height-lg,1.5rem))] [--badge-size-padding-inline:var(--badge-padding-inline-lg,0.5rem)] [--badge-size-font-size:var(--badge-font-size-lg,0.875rem)]',
      },
    },
    defaultVariants: { color: 'default', size: 'md' },
  },
)
export const badgeDotClassName = cva(
  'inline-block size-[var(--badge-dot-size,var(--badge-size-dot-size))] rounded-full bg-current text-[var(--badge-color,var(--badge-semantic-color))]',
  {
    variants: {
      size: {
        sm: '[--badge-size-dot-size:var(--badge-dot-size-sm,0.375rem)]',
        md: '[--badge-size-dot-size:var(--badge-dot-size-md,0.5rem)]',
        lg: '[--badge-size-dot-size:var(--badge-dot-size-lg,0.625rem)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const badgeDotColorClassName = cva('', {
  variants: {
    color: {
      default: '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))]',
      primary: '[--badge-semantic-color:var(--badge-color-primary,var(--color-primary))]',
      danger: '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))]',
      warning: '[--badge-semantic-color:var(--badge-color-warning,var(--color-warning))]',
      success: '[--badge-semantic-color:var(--badge-color-success,var(--color-success))]',
      info: '[--badge-semantic-color:var(--badge-color-info,var(--color-info))]',
    },
  },
  defaultVariants: { color: 'default' },
})
export const badgeRootClassName =
  'relative inline-flex w-fit [&>[data-slot=badge]]:absolute [&>[data-slot=badge]]:end-0 [&>[data-slot=badge]]:top-0 [&>[data-slot=badge]]:z-10 [&>[data-slot=badge]]:-translate-y-1/2 [&>[data-slot=badge]]:translate-x-1/2 rtl:[&>[data-slot=badge]]:-translate-x-1/2 [&>[data-slot=badge-dot]]:absolute [&>[data-slot=badge-dot]]:end-0 [&>[data-slot=badge-dot]]:top-0 [&>[data-slot=badge-dot]]:z-10 [&>[data-slot=badge-dot]]:-translate-y-1/2 [&>[data-slot=badge-dot]]:translate-x-1/2 rtl:[&>[data-slot=badge-dot]]:-translate-x-1/2'
export const badgeIndicatorClassName =
  'absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2'
export const badgeGroupClassName = 'inline-flex flex-wrap items-center gap-1.5'
export const badgeRibbonRootClassName = 'relative block w-full'
export const badgeRibbonClassName =
  "absolute -end-2 top-2 z-10 rounded-sm rounded-ee-none px-2 text-sm leading-[22px] whitespace-nowrap after:absolute after:end-0 after:top-full after:size-2 after:origin-top after:scale-y-75 after:border-4 after:border-solid after:border-current after:[border-inline-end-color:transparent] after:[border-block-end-color:transparent] after:brightness-75 after:content-[''] data-[placement=start]:end-auto data-[placement=start]:-start-2 data-[placement=start]:rounded-ee-sm data-[placement=start]:rounded-es-none data-[placement=start]:after:end-auto data-[placement=start]:after:start-0 data-[placement=start]:after:[border-inline-end-color:currentColor] data-[placement=start]:after:[border-inline-start-color:transparent]"
export const badgeRibbonColorClassName = cva('', {
  variants: {
    color: {
      default:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
      primary:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
      danger:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
      warning:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-warning,var(--color-warning))] [--badge-semantic-color-foreground:var(--badge-color-warning-foreground,var(--color-warning-foreground))]',
      success:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-success,var(--color-success))] [--badge-semantic-color-foreground:var(--badge-color-success-foreground,var(--color-success-foreground))]',
      info: 'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-info,var(--color-info))] [--badge-semantic-color-foreground:var(--badge-color-info-foreground,var(--color-info-foreground))]',
    },
  },
  defaultVariants: { color: 'primary' },
})
export const badgeRibbonTextClassName =
  'relative text-[var(--badge-color-foreground,var(--badge-semantic-color-foreground))]'
