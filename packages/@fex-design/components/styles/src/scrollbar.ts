import { cva } from 'class-variance-authority'

export const scrollbarRootClassName =
  'relative isolate overflow-hidden [--scrollbar-track-background:transparent] [--scrollbar-corner-background:transparent] data-[show-track=true]:[--scrollbar-track-background:var(--scrollbar-track-color,var(--border))] data-[show-corner=true]:[--scrollbar-corner-background:var(--scrollbar-corner-color,var(--scrollbar-track-color,var(--border)))]'
export const scrollbarViewportClassName = cva(
  [
    'size-full overflow-auto',
    '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
  ],
  {
    variants: {
      overflowX: { auto: 'overflow-x-auto', hidden: 'overflow-x-hidden' },
      overflowY: { auto: 'overflow-y-auto', hidden: 'overflow-y-hidden' },
    },
    defaultVariants: { overflowX: 'auto', overflowY: 'auto' },
  },
)
// The shared size token is the visible thickness; padding expands Bar and Corner around it.
export const scrollbarBarClassName = cva(
  'absolute z-10 select-none touch-none transition-opacity duration-[var(--scrollbar-transition-duration,150ms)] p-[var(--scrollbar-padding,1px)] data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0',
  {
    variants: {
      axis: {
        x: 'inset-x-0 bottom-0 h-[calc(var(--scrollbar-size,6px)+2*var(--scrollbar-padding,1px))] [[data-slot=scrollbar-root][data-scrollbar-y=true]>&]:end-[calc(var(--scrollbar-size,6px)+2*var(--scrollbar-padding,1px))]',
        y: 'inset-y-0 end-0 w-[calc(var(--scrollbar-size,6px)+2*var(--scrollbar-padding,1px))] [[data-slot=scrollbar-root][data-scrollbar-x=true]>&]:bottom-[calc(var(--scrollbar-size,6px)+2*var(--scrollbar-padding,1px))]',
      },
    },
  },
)
// Extend only the background into the junction; Thumb travel and the 6px track stay unchanged.
// Direct Root > Bar > Track selectors keep nested scrollbars and custom layouts independent.
export const scrollbarTrackClassName = [
  'relative size-full rounded-[var(--scrollbar-radius,var(--radius-md))] bg-[var(--scrollbar-track-background,var(--scrollbar-track-color,var(--border)))]',
  'after:absolute after:pointer-events-none after:bg-inherit',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-y=true]>[data-axis=x]>&]:rounded-e-none',
  "[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-y=true]>[data-axis=x]>&]:after:content-['']",
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-y=true]>[data-axis=x]>&]:after:inset-y-0',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-y=true]>[data-axis=x]>&]:after:w-[calc(2*var(--scrollbar-padding,1px))]',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-y=true]>[data-axis=x]>&]:after:end-[calc(-2*var(--scrollbar-padding,1px))]',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-x=true]>[data-axis=y]>&]:rounded-b-none',
  "[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-x=true]>[data-axis=y]>&]:after:content-['']",
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-x=true]>[data-axis=y]>&]:after:inset-x-0',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-x=true]>[data-axis=y]>&]:after:h-[calc(2*var(--scrollbar-padding,1px))]',
  '[[data-slot=scrollbar-root][data-show-corner=true][data-scrollbar-x=true]>[data-axis=y]>&]:after:bottom-[calc(-2*var(--scrollbar-padding,1px))]',
].join(' ')
export const scrollbarThumbClassName = cva(
  'absolute rounded-[var(--scrollbar-radius,var(--radius-md))] bg-[var(--scrollbar-thumb-color,color-mix(in_oklab,var(--foreground)_55%,transparent))] transition-colors hover:bg-[var(--scrollbar-thumb-hover-color,color-mix(in_oklab,var(--foreground)_75%,transparent))] data-[dragging=true]:bg-[var(--scrollbar-thumb-active-color,var(--primary))]',
  {
    variants: { axis: { x: 'inset-y-0 left-0', y: 'inset-x-0 top-0' } },
  },
)
export const scrollbarCornerClassName =
  'absolute bottom-0 end-0 z-10 size-[calc(var(--scrollbar-size,6px)+2*var(--scrollbar-padding,1px))] p-[var(--scrollbar-padding,1px)] bg-clip-content bg-[var(--scrollbar-corner-background,var(--scrollbar-corner-color,var(--scrollbar-track-color,var(--border))))] hidden [[data-scrollbar-x=true][data-scrollbar-y=true]>&]:block'
