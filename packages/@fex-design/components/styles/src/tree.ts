import { cva } from 'class-variance-authority'

export const treeRootClassName = 'min-w-0 outline-none'

export const treeViewportClassName = 'min-w-0'

export const treeItemClassName = cva(
  [
    'group/tree-item relative flex w-fit max-w-full min-w-0 items-center gap-1 rounded-md px-1 py-0.5 text-sm outline-none data-[block=true]:w-full',
    'focus-visible:ring-3 focus-visible:ring-focus/50',
    'data-[selectable=true]:cursor-pointer',
    'data-[disabled=true]:cursor-not-allowed data-[selectable=true]:data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
    'data-[dnd-enabled=true]:cursor-grab data-[dnd-enabled=true]:touch-none data-[dnd-enabled=true]:select-none data-[dragging=true]:opacity-35',
    'data-[drag-preview=true]:gap-0 data-[drag-preview=true]:shadow-lg [&[data-drag-preview=true]>[data-slot=tree-trigger]]:hidden [&[data-drag-preview=true]>[data-slot=tree-trigger-placeholder]]:hidden',
    'data-[drag-preview=true]:border data-[drag-preview=true]:border-border data-[drag-preview=true]:bg-background data-[drag-preview=true]:text-foreground data-[drag-preview=true]:opacity-75 data-[drag-preview=true]:shadow-xl data-[drag-preview=true]:ring-1 data-[drag-preview=true]:ring-border/70',
    'data-[drop-position=bottom]:z-30 data-[drop-position=inside]:z-30',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'min-h-7',
        md: 'min-h-8',
        lg: 'min-h-9',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export const treeTriggerClassName = [
  'inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-transform',
  'hover:bg-muted-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/50',
  '-rotate-90 aria-expanded:rotate-0 disabled:pointer-events-none',
].join(' ')

export const treeTitleClassName = [
  'inline-flex min-w-0 w-max max-w-full items-center truncate rounded-md px-2 py-1 transition-colors text-[color:var(--tree-title-color,var(--color-foreground))] group-hover/tree-item:bg-[var(--tree-hover-background,var(--color-muted-background))] [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed',
  'group-data-[selected=true]/tree-item:bg-[var(--tree-selected-background,color-mix(in_oklab,var(--color-primary)_10%,transparent))] group-data-[selected=true]/tree-item:text-[color:var(--tree-selected-color,var(--color-primary))]',
  'group-data-[block=true]/tree-item:flex-1',
].join(' ')

export const treeDropIndicatorClassName = [
  'pointer-events-none absolute z-20 h-0.5 rounded-full bg-[var(--tree-drop-indicator-color,var(--color-primary))]',
  'before:absolute before:left-0 before:top-1/2 before:size-2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-2 before:border-[var(--tree-drop-indicator-color,var(--color-primary))] before:bg-background',
].join(' ')
