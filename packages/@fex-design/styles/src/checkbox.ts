import { cva, type VariantProps } from 'class-variance-authority'

export const checkboxRootClassName = cva(
  'relative inline-grid min-w-0 grid-cols-[auto_1fr] items-center gap-(--checkbox-content-gap) align-middle [--checkbox-content-gap:0.5rem]',
  {
    variants: {
      size: {
        sm: '[--checkbox-control-size:0.875rem] text-xs',
        md: '[--checkbox-control-size:1rem] text-sm',
        lg: '[--checkbox-control-size:1.25rem] text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const checkboxControlClassName = [
  'peer col-start-1 row-start-1 size-[var(--checkbox-size,var(--checkbox-control-size))] shrink-0 appearance-none rounded-[min(var(--radius-md),4px)] border shadow-xs outline-none',
  'border-[var(--checkbox-border-color,var(--border))] bg-[var(--checkbox-background,var(--background))]',
  'checked:border-[var(--checkbox-checked-border-color,var(--checkbox-checked-background,var(--primary)))] checked:bg-[var(--checkbox-checked-background,var(--primary))]',
  'indeterminate:border-[var(--checkbox-checked-border-color,var(--checkbox-checked-background,var(--primary)))] indeterminate:bg-[var(--checkbox-checked-background,var(--primary))]',
  'focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-[var(--checkbox-ring-color,var(--focus-ring))]',
  'disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-background disabled:shadow-none aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20',
].join(' ')
export const checkboxIndicatorClassName =
  'pointer-events-none invisible col-start-1 row-start-1 flex size-[var(--checkbox-size,var(--checkbox-control-size))] items-center justify-center text-[var(--checkbox-indicator-color,var(--primary-foreground))] peer-checked:visible peer-indeterminate:visible [&_svg]:pointer-events-none [&_svg]:size-[75%] [&_svg]:shrink-0'
export const checkboxCheckIconClassName =
  'block [[data-slot=checkbox-root]:has(input:indeterminate)_&]:hidden'
export const checkboxMinusIconClassName =
  'hidden [[data-slot=checkbox-root]:has(input:indeterminate)_&]:block'
export const checkboxLabelClassName =
  'col-start-2 row-start-1 min-w-0 cursor-pointer select-none [[data-slot=checkbox-root]:has(input:disabled)_&]:cursor-not-allowed [[data-slot=checkbox-root]:has(input:disabled)_&]:text-disabled-foreground'
export const checkboxGroupClassName = cva('grid min-w-0 gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid-flow-col auto-cols-max items-center',
      vertical: 'grid-flow-row',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})
/** @deprecated Compose CheckboxRoot and CheckboxControl instead. */
export const checkboxClassName = cva(checkboxControlClassName)
export type CheckboxStyleProps = VariantProps<typeof checkboxRootClassName>
export type CheckboxGroupStyleProps = VariantProps<typeof checkboxGroupClassName>
