import { cva, type VariantProps } from 'class-variance-authority'
import {
  popoverContentClassName,
  popoverMenuContentClassName,
} from '@fex-design/components-styles/popover'

export const menuRootClassName = cva(
  'min-w-0 text-sm text-[var(--menu-color,var(--foreground))] [--menu-item-height:32px] [--menu-item-padding-x:10px] [--menu-indent:18px]',
  {
    variants: {
      size: {
        sm: '[--menu-item-height:28px] [--menu-item-padding-x:8px] [--menu-indent:14px]',
        md: '[--menu-item-height:32px] [--menu-item-padding-x:10px] [--menu-indent:18px]',
        lg: '[--menu-item-height:36px] [--menu-item-padding-x:12px] [--menu-indent:22px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
export const menuContentClassName = cva(
  'flex min-w-0 gap-0.5 bg-[var(--menu-background,transparent)] outline-none',
  {
    variants: {
      layout: { vertical: 'flex-col', inline: 'flex-col', horizontal: 'flex-row items-center' },
    },
    defaultVariants: { layout: 'vertical' },
  },
)
export const menuItemClassName = cva(
  [
    'group/menu-item flex h-[var(--menu-item-height)] min-w-0 cursor-pointer select-none items-center gap-2 rounded-[var(--menu-item-radius,var(--radius-md))] border border-transparent bg-[var(--menu-item-background,transparent)] px-[var(--menu-item-padding-x)] text-start text-[var(--menu-item-color,var(--menu-color,inherit))] outline-none transition-colors motion-reduce:transition-none',
    'hover:bg-[var(--menu-item-hover-background,var(--muted-background))] hover:text-[var(--menu-item-hover-color,var(--menu-item-color,var(--menu-color,inherit)))] focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus/50',
    'data-[selected=true]:bg-[var(--menu-item-selected-background,color-mix(in_oklab,var(--primary)_10%,transparent))] data-[selected=true]:text-[var(--menu-item-selected-color,var(--primary))]',
    'data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-[var(--menu-item-disabled-color,var(--muted-foreground))] data-[disabled=true]:opacity-50',
  ].join(' '),
  {
    variants: { orientation: { vertical: 'w-full', horizontal: 'w-auto' } },
    defaultVariants: { orientation: 'vertical' },
  },
)
export const subMenuContentClassName = cva('flex min-w-0 flex-col gap-0.5 outline-none', {
  variants: {
    inline: {
      true: 'ms-[var(--menu-indent)]',
      false: `${popoverContentClassName()} ${popoverMenuContentClassName} min-w-44`,
    },
  },
  defaultVariants: { inline: false },
})
export const menuItemIconClassName =
  'inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4'
export const subMenuBodyClassName = 'flex min-w-0 flex-col gap-0.5'
export const menuItemLabelClassName = 'min-w-0 flex-1 truncate'
export const menuItemSuffixClassName =
  'ms-auto inline-flex shrink-0 items-center justify-center text-xs text-muted-foreground'
export const menuExpandIconClassName =
  'ms-auto size-4 shrink-0 transition-transform motion-reduce:transition-none rtl:rotate-180 group-data-[expanded=true]/menu-item:rotate-90 group-data-[orientation=horizontal]/menu-item:rotate-90 [&_svg]:size-4'
export const menuGroupClassName = 'min-w-0 py-1'
export const menuGroupLabelClassName =
  'px-[var(--menu-item-padding-x)] py-1 text-xs font-medium leading-5 text-muted-foreground'
export const menuSeparatorClassName = 'my-1 h-px bg-border'
export type MenuRootStyleProps = VariantProps<typeof menuRootClassName>
export type MenuItemStyleProps = VariantProps<typeof menuItemClassName>
