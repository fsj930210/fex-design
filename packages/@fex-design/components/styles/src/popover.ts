import { cva } from 'class-variance-authority'

export const popoverContentClassName = cva(
  [
    'z-[var(--floating-z-index,50)] w-max max-h-[var(--floating-available-height,calc(100vh-16px))] max-w-[var(--floating-available-width,calc(100vw-16px))] overflow-visible',
    'rounded-[var(--popover-radius,var(--radius-md))] border border-[var(--popover-border,var(--border))] bg-[var(--popover-background,var(--elevated-background))] p-[var(--popover-padding,12px)] text-sm text-[var(--popover-foreground,var(--elevated-foreground))] shadow-[var(--popover-shadow,var(--shadow-lg))] outline-none',
    'origin-[var(--floating-transform-origin)] will-change-[opacity,transform]',
    "before:absolute before:content-[''] data-[side=right]:before:right-full data-[side=right]:before:top-0 data-[side=right]:before:h-full data-[side=right]:before:w-[var(--floating-side-offset,0px)] data-[side=left]:before:left-full data-[side=left]:before:top-0 data-[side=left]:before:h-full data-[side=left]:before:w-[var(--floating-side-offset,0px)] data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[var(--floating-side-offset,0px)] data-[side=bottom]:before:w-full data-[side=top]:before:top-full data-[side=top]:before:left-0 data-[side=top]:before:h-[var(--floating-side-offset,0px)] data-[side=top]:before:w-full",
    'transition-[opacity,transform] duration-[var(--popover-motion-duration,140ms)] ease-[cubic-bezier(0.2,0,0,1)]',
    'data-[state=open]:scale-100 data-[state=open]:opacity-100',
    'data-[phase=closing]:pointer-events-none data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0',
    'data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0',
  ].join(' '),
)

export const popoverArrowClassName = [
  'pointer-events-none absolute size-[var(--popover-arrow-size,12px)] bg-[var(--popover-background,var(--elevated-background))]',
  'data-[side=top]:bottom-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=top]:border-b data-[side=top]:border-r data-[side=top]:border-[var(--popover-border,var(--border))]',
  'data-[side=bottom]:top-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=bottom]:border-l data-[side=bottom]:border-t data-[side=bottom]:border-[var(--popover-border,var(--border))]',
  'data-[side=left]:right-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=left]:border-r data-[side=left]:border-t data-[side=left]:border-[var(--popover-border,var(--border))]',
  'data-[side=right]:left-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=right]:border-b data-[side=right]:border-l data-[side=right]:border-[var(--popover-border,var(--border))]',
  'data-[side=top]:rotate-45',
  'data-[side=bottom]:rotate-45',
  'data-[side=left]:rotate-45',
  'data-[side=right]:rotate-45',
].join(' ')

export const popoverMenuContentClassName =
  'min-w-32 max-w-[min(320px,var(--floating-available-width,calc(100vw-16px)))] [--popover-padding:4px]'

export const popoverHeaderClassName = 'mb-[var(--popover-title-gap,8px)] grid gap-1'

export const popoverTitleClassName =
  'text-sm font-medium leading-none text-[var(--popover-foreground,var(--elevated-foreground))]'

export const popoverDescriptionClassName = 'text-sm leading-6 text-muted-foreground'
