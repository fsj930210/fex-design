export const dialogOverlayClassName = [
  'fixed inset-0 z-[var(--dialog-z-index,50)] bg-black/45',
  'transition-opacity duration-[var(--dialog-motion-duration,200ms)] ease-[var(--dialog-motion-ease,cubic-bezier(0.2,0,0,1))]',
  'opacity-100 starting:opacity-0 data-[phase=opening]:opacity-0 motion-reduce:transition-none',
  'data-[phase=closing]:opacity-0 data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0',
].join(' ')

export const dialogContentClassName = [
  'fixed left-1/2 top-1/2 z-[calc(var(--dialog-z-index,50)+1)] -translate-x-1/2 -translate-y-1/2 overflow-hidden',
  'w-[min(var(--dialog-width,32rem),calc(100vw-2rem))] min-w-0',
  'flex flex-col rounded-md border border-border bg-[var(--dialog-content-background,var(--color-background))] text-foreground shadow-xl outline-none',
  '[interpolate-size:allow-keywords] transition-[opacity,scale,width,height,border-radius] duration-[var(--dialog-motion-duration,200ms)] ease-[var(--dialog-motion-ease,cubic-bezier(0.2,0,0,1))] motion-reduce:transition-none',
  'scale-100 opacity-100 starting:scale-95 starting:opacity-0 data-[phase=opening]:scale-95 data-[phase=opening]:opacity-0',
  'data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0',
  'data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0',
].join(' ')

export const dialogHeaderClassName =
  'relative grid gap-1 rounded-t-[inherit] border-b border-border/60 bg-[var(--dialog-header-background,var(--color-background))] p-4 pe-20'
export const dialogTitleClassName = 'text-base font-semibold leading-6 text-foreground'
export const dialogDescriptionClassName = 'text-sm leading-6 text-muted-foreground'
export const dialogBodyClassName =
  'min-h-0 flex-1 overflow-auto bg-[var(--dialog-content-background,var(--color-background))] p-4 text-sm leading-6 text-foreground'
export const dialogFooterClassName =
  'flex flex-wrap items-center justify-end gap-2 rounded-b-[inherit] border-t border-border/60 bg-[var(--dialog-footer-background,var(--color-background))] p-4'
export const dialogActionsClassName = 'absolute end-3 top-3 z-10 flex items-center gap-1'
export const dialogMessageClassName = [
  '[&_[data-slot=dialog-header]]:!border-b-0 [&_[data-slot=dialog-header]]:!px-5 [&_[data-slot=dialog-header]]:!pt-5 [&_[data-slot=dialog-header]]:!pb-0',
  '[&_[data-slot=dialog-body]]:!px-5 [&_[data-slot=dialog-body]]:!py-4',
  '[&_[data-slot=dialog-footer]]:!border-t-0 [&_[data-slot=dialog-footer]]:!px-3 [&_[data-slot=dialog-footer]]:!pt-2 [&_[data-slot=dialog-footer]]:!pb-3 [&_[data-slot=dialog-footer]]:!gap-2',
].join(' ')
export const dialogCloseClassName =
  'inline-flex cursor-pointer items-center justify-center outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
export const dialogIconCloseClassName =
  'inline-flex size-6 cursor-pointer items-center justify-center rounded-md border-transparent !bg-transparent p-0 text-xl leading-none text-muted-foreground outline-none transition-colors hover:!bg-muted-background hover:text-foreground focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'

export type DialogStyleProps = Record<never, never>
