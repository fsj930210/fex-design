import { cva, type VariantProps } from 'class-variance-authority'

export const radioGroupClassName = cva('grid min-w-0 gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid-flow-col auto-cols-max items-center',
      vertical: 'grid-flow-row',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export const radioRootClassName = cva(
  [
    'peer inline-flex size-[var(--radio-size,var(--radio-control-size))] shrink-0 items-center justify-center rounded-full border border-[var(--radio-border-color,var(--border))] bg-[var(--radio-background,var(--background))] text-[var(--radio-checked-color,var(--primary))] shadow-xs',
    'outline-none transition-none',
    'focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-[var(--radio-ring-color,var(--focus-ring))]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20',
    'data-[state=checked]:border-[var(--radio-checked-color,var(--primary))]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: '[--radio-control-size:0.875rem]',
        md: '[--radio-control-size:1rem]',
        lg: '[--radio-control-size:1.25rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const radioIndicatorClassName =
  'block size-[var(--radio-indicator-size,50%)] rounded-full bg-current transition-none'

export const radioItemClassName =
  'inline-grid min-w-0 grid-cols-[auto_1fr] items-center gap-(--radio-content-gap) align-middle [--radio-content-gap:0.5rem]'

export const radioLabelClassName =
  'min-w-0 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-disabled-foreground'

export const radioButtonClassName = cva(
  [
    'relative -ml-px inline-flex h-[var(--radio-button-height,var(--radio-button-control-height))] min-w-0 items-center justify-center border border-[var(--radio-button-border-color,var(--border))] bg-[var(--radio-button-background,var(--background))] px-[var(--radio-button-padding-inline,var(--radio-button-control-padding-inline))] text-sm text-foreground shadow-xs',
    'first:ml-0 first:rounded-l-md last:rounded-r-md',
    'outline-none transition-none',
    'hover:bg-muted-background',
    'focus-visible:z-10 focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-[var(--radio-button-ring-color,var(--focus-ring))]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20',
    'data-[state=checked]:z-10 data-[state=checked]:border-[var(--radio-button-checked-background,var(--primary))] data-[state=checked]:bg-[var(--radio-button-checked-background,var(--primary))] data-[state=checked]:text-[var(--radio-button-checked-foreground,var(--primary-foreground))]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: '[--radio-button-control-height:var(--height-sm)] [--radio-button-control-padding-inline:0.5rem] text-xs',
        md: '[--radio-button-control-height:var(--height-md)] [--radio-button-control-padding-inline:0.625rem] text-sm',
        lg: '[--radio-button-control-height:var(--height-lg)] [--radio-button-control-padding-inline:1rem] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type RadioGroupStyleProps = VariantProps<typeof radioGroupClassName>
export type RadioStyleProps = VariantProps<typeof radioRootClassName>
export type RadioButtonStyleProps = VariantProps<typeof radioButtonClassName>
