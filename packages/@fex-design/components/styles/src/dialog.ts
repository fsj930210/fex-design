export const dialogOverlayClassName = [
  'fixed inset-0 z-[var(--dialog-z-index,50)] bg-[var(--overlay-background, oklch(0 0 0 / 48%))]',
  'transition-opacity duration-[var(--dialog-motion-duration,140ms)] ease-[var(--dialog-motion-ease,cubic-bezier(0.2,0,0,1))]',
  'data-[state=open]:opacity-100 data-[phase=opening]:opacity-100',
  'data-[phase=closing]:opacity-0 data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0',
].join(' ')

export const dialogContentClassName = [
  'fixed left-1/2 top-1/2 z-[calc(var(--dialog-z-index,50)+1)] -translate-x-1/2 -translate-y-1/2 overflow-auto',
  'w-[min(var(--dialog-width,32rem),calc(100vw-2rem))] min-w-0',
  'flex flex-col rounded-md border border-border bg-background text-foreground shadow-xl outline-none',
  'transition-[opacity,transform] duration-[var(--dialog-motion-duration,140ms)] ease-[var(--dialog-motion-ease,cubic-bezier(0.2,0,0,1))]',
  'data-[state=open]:scale-100 data-[state=open]:opacity-100',
  'data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0',
  'data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0',
].join(' ')

export const dialogHeaderClassName = 'relative grid gap-1 p-4 pb-2 pr-20'
export const dialogTitleClassName = 'text-base font-semibold leading-6 text-foreground'
export const dialogDescriptionClassName = 'text-sm leading-6 text-muted-foreground'
export const dialogBodyClassName = 'min-h-0 flex-1 overflow-auto px-4 py-3 text-sm leading-6 text-foreground'
export const dialogFooterClassName = 'flex flex-wrap items-center justify-end gap-2 p-4 pt-2'
export const dialogCloseClassName =
  'inline-flex cursor-pointer items-center justify-center outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
export const dialogIconCloseClassName =
  'absolute right-3 top-3 inline-flex size-8 cursor-pointer items-center justify-center rounded-md border-transparent bg-transparent p-0 text-xl leading-none text-muted-foreground outline-none transition-colors hover:bg-muted-background hover:text-foreground focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'

export type DialogStyleProps = Record<never, never>

