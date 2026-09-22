import { cva, type VariantProps } from 'class-variance-authority'
import { inputFocusClassName } from './input'
import { selectableItemSelectedClassName } from './selectable-item'

export const selectTriggerClassName = cva(
  [
    'group/select-trigger flex min-h-9 w-full min-w-0 items-center gap-2 rounded-md border border-[var(--input-border-color,var(--border))] bg-[var(--input-background,var(--background))] text-sm text-[var(--input-color,var(--foreground))] outline-none',
    inputFocusClassName,
    'data-[status=error]:border-danger data-[status=error]:ring-2 data-[status=error]:ring-danger/20',
    'data-[status=warning]:border-warning data-[status=warning]:ring-2 data-[status=warning]:ring-warning/20',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'min-h-8 text-xs',
        md: 'min-h-9 text-sm',
        lg: 'min-h-10 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const selectValueContainerClassName = 'flex flex-1 flex-wrap items-center gap-1'
export const selectValueClassName = 'contents'
export const selectPlaceholderClassName = 'truncate text-muted-foreground'
export const selectInputClassName = 'min-w-0 flex-1 border-0 bg-transparent outline-none'
export const selectSuffixClassName =
  'relative z-10 ml-auto inline-flex size-4 shrink-0 self-center items-center justify-center text-muted-foreground [&_svg]:size-4'
export const selectClearClassName = [
  'invisible absolute inset-0 inline-flex cursor-pointer items-center justify-center bg-transparent text-muted-foreground opacity-0 outline-none transition-[color,opacity]',
  'group-hover/select-trigger:visible group-hover/select-trigger:opacity-100 group-focus-within/select-trigger:visible group-focus-within/select-trigger:opacity-100',
  'hover:text-foreground focus-visible:visible focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-focus/40',
].join(' ')
export const selectClearableIndicatorClassName =
  'inline-flex group-hover/select-trigger:opacity-0 group-focus-within/select-trigger:opacity-0'
export const selectIndicatorClassName =
  'inline-flex items-center justify-center transition-[transform,opacity] data-[state=open]:rotate-180'

export const selectContentClassName = [
  'z-[var(--floating-z-index,50)] overflow-hidden rounded-md border border-border bg-elevated-background text-elevated-foreground shadow-lg [--popover-padding:0px]',
  'min-w-[var(--floating-reference-width)]',
  'max-h-[var(--floating-available-height,calc(100vh-16px))]',
].join(' ')
export const selectListClassName =
  'max-h-[inherit] overflow-y-auto p-1 overscroll-contain outline-none'
export const selectOptionClassName = [
  'group/select-option relative flex min-h-8 cursor-default select-none items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
  'data-[active=true]:bg-muted-background data-[disabled=true]:cursor-not-allowed data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  selectableItemSelectedClassName,
].join(' ')
export const selectOptionLabelClassName = 'min-w-0 flex-1 truncate'
export const selectOptionIndicatorClassName =
  'inline-flex size-4 shrink-0 items-center justify-center text-primary opacity-0 transition-opacity group-data-[selected=true]/select-option:opacity-100 [&_svg]:size-4'
export const selectGroupLabelClassName = 'px-2 py-1.5 text-xs font-medium text-muted-foreground'
export const selectEmptyClassName = 'px-3 py-6 text-center text-sm text-muted-foreground'
export const selectLoadingClassName = 'px-3 py-6 text-center text-sm text-muted-foreground'

export type SelectStyleProps = VariantProps<typeof selectTriggerClassName>

