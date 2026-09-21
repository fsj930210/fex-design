export const inputNumberActionsClassName =
  'absolute top-0 right-0 pointer-events-none flex h-full w-5 shrink-0 flex-col items-stretch gap-0 overflow-hidden border-l border-transparent opacity-0 !pr-0 transition-opacity group-hover/input-root:pointer-events-auto group-hover/input-root:border-border group-hover/input-root:opacity-100 group-focus-within/input-root:pointer-events-auto group-focus-within/input-root:border-border group-focus-within/input-root:opacity-100'

export const inputNumberActionClassName = [
  'h-auto min-h-0 flex-1 rounded-none border-0 px-0 text-muted-foreground',
  '[--button-icon-size:calc(var(--input-icon-size)*0.625)] [--icon-size:var(--button-icon-size)]',
].join(' ')

export const inputNumberDecrementClassName = inputNumberActionClassName
export const inputNumberIncrementClassName = `${inputNumberActionClassName} border-b border-border`
