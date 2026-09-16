import { cva } from 'class-variance-authority'

const inputBaseClassName = [
  'group/input-root relative flex h-(--input-height) w-full min-w-0 items-stretch overflow-hidden rounded-md border bg-[var(--input-background,var(--background))] text-[var(--input-color,var(--foreground))]',
  '[--input-height:var(--input-height-md,var(--height-md))] [--input-icon-size:var(--input-icon-size-md,var(--icon-size-md))] [--input-clear-icon-size:0.875rem]',
  'border-[var(--input-border-color,var(--border))] outline-none transition-colors',
  'hover:border-foreground/30 focus-within:border-[var(--focus-border)] focus-within:hover:border-[var(--focus-border)] focus-within:ring-3 focus-within:ring-[var(--input-ring-color,var(--focus-ring))]',
  'has-[[aria-invalid=true]]:border-danger has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-danger/20',
  'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-disabled-background data-[disabled=true]:text-disabled-foreground data-[disabled=true]:opacity-70',
].join(' ')

export const inputRootClassName = cva(inputBaseClassName, {
  variants: {
    variant: {
      outlined: '',
      filled:
        'border-transparent bg-muted-background hover:bg-hover-background focus-within:border-focus focus-within:bg-background',
      borderless:
        'border-transparent bg-transparent hover:bg-muted-background focus-within:border-transparent focus-within:bg-muted-background focus-within:ring-0',
      underlined:
        'rounded-none border-x-0 border-t-0 bg-transparent hover:border-foreground/40 focus-within:ring-0',
    },
    size: {
      sm: '[--input-height:var(--input-height-sm,var(--height-sm))] [--input-icon-size:var(--input-icon-size-sm,0.75rem)] [--input-clear-icon-size:0.75rem] [&_[data-slot=input-control]]:px-2 [&_[data-slot=input-control]]:text-xs',
      md: '[--input-height:var(--input-height-md,var(--height-md))] [--input-icon-size:var(--input-icon-size-md,var(--icon-size-md))]',
      lg: '[--input-height:var(--input-height-lg,var(--height-lg))] [--input-icon-size:var(--input-icon-size-lg,1.25rem)] [--input-clear-icon-size:1rem] [&_[data-slot=input-control]]:px-4 [&_[data-slot=input-control]]:text-base',
    },
  },
  defaultVariants: { variant: 'outlined', size: 'md' },
})

export const inputControlClassName = [
  'min-w-0 flex-1 bg-transparent px-2.5 py-1 text-sm text-inherit outline-none',
  'placeholder:text-[var(--input-placeholder-color,var(--placeholder-foreground))]',
  'disabled:cursor-not-allowed file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
].join(' ')

export const inputPrefixClassName =
  'flex shrink-0 items-center ps-2.5 text-muted-foreground empty:hidden [&_svg]:size-(--input-icon-size)'
export const inputSuffixClassName =
  'flex shrink-0 items-center pe-2.5 text-muted-foreground empty:hidden [&_svg]:size-(--input-icon-size)'

const inputAddonClassName =
  'relative z-0 flex shrink-0 self-stretch items-center border border-[var(--input-border-color,var(--border))] bg-muted-background px-2.5 text-sm text-muted-foreground [&:has(>[data-input-addon-fill])]:overflow-hidden [&:has(>[data-input-addon-fill])]:border-0 [&:has(>[data-input-addon-fill])]:bg-transparent [&:has(>[data-input-addon-fill])]:p-0 [&>[data-input-addon-fill]]:!rounded-none'
export const inputAddonBeforeClassName = `${inputAddonClassName} rounded-s-md`
export const inputAddonAfterClassName = `${inputAddonClassName} rounded-e-md`

export const inputClearClassName = [
  'invisible flex shrink-0 items-center justify-center bg-transparent px-2 text-muted-foreground opacity-0 outline-none transition-[color,opacity]',
  'group-hover/input-root:visible group-hover/input-root:opacity-100 group-focus-within/input-root:visible group-focus-within/input-root:opacity-100 active:visible active:opacity-100',
  'hover:text-foreground focus-visible:visible focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-focus/40 disabled:pointer-events-none disabled:opacity-0',
  '[&_svg]:size-(--input-clear-icon-size)',
].join(' ')

export const inputActionClassName = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center bg-transparent p-1 text-muted-foreground outline-none transition-colors hover:text-foreground',
  'focus-visible:ring-2 focus-visible:ring-focus/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-(--input-icon-size)',
].join(' ')

export const inputSearchAddonClassName =
  'h-full border-0 px-3 focus-visible:z-10 focus-visible:ring-inset'

export const inputGroupClassName = [
  'flex w-full min-w-0 items-stretch',
  '[&>*]:relative [&>*]:z-0 [&>*]:min-w-0 [&>*]:rounded-none',
  '[&>*:first-child]:rounded-s-[var(--input-group-radius,var(--radius-md))] [&>*:last-child]:rounded-e-[var(--input-group-radius,var(--radius-md))]',
  '[&>[data-slot=input-group]>*]:rounded-none',
  '[&>[data-slot=input-group]:first-child>*:first-child]:rounded-s-[var(--input-group-radius,var(--radius-md))]',
  '[&>[data-slot=input-group]:last-child>*:last-child]:rounded-e-[var(--input-group-radius,var(--radius-md))]',
  '[&>*:focus-within]:z-10 [&>*+*]:-ms-px',
].join(' ')
