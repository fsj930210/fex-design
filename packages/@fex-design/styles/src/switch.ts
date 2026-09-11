import { cva } from 'class-variance-authority'
export const switchClassName = cva(
  [
    'group/switch relative inline-grid shrink-0 cursor-pointer items-center align-middle select-none border-0 p-0 outline-none',
    'h-(--switch-track-height) min-w-[calc(var(--switch-thumb-size)*2+4px)]',
    'bg-[var(--switch-track-background,var(--muted-background))] text-[var(--switch-color,var(--muted-foreground))] shadow-xs ring-1 ring-inset ring-[var(--switch-track-border-color,var(--border))] transition-colors duration-150',
    'data-[state=checked]:bg-[var(--switch-track-checked-background,var(--primary))] data-[state=checked]:text-[var(--switch-checked-color,var(--primary-foreground))] data-[state=checked]:ring-[var(--switch-track-checked-border-color,var(--primary))]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
    'disabled:cursor-not-allowed disabled:opacity-50 data-[loading]:cursor-wait',
    'aria-invalid:ring-2 aria-invalid:ring-danger aria-invalid:focus-visible:outline-danger',
  ].join(' '),
  {
    variants: {
      size: {
        sm: '[--switch-track-height:var(--switch-height-sm,var(--height-sm))] [--switch-thumb-size:calc(var(--switch-track-height)-4px)] text-xs',
        md: '[--switch-track-height:var(--switch-height-md,var(--height-md))] [--switch-thumb-size:calc(var(--switch-track-height)-4px)] text-sm',
        lg: '[--switch-track-height:var(--switch-height-lg,var(--height-lg))] [--switch-thumb-size:calc(var(--switch-track-height)-4px)] text-base',
      },
      shape: {
        rounded: 'rounded-[5px] [--switch-thumb-radius:3px]',
        pill: 'rounded-full [--switch-thumb-radius:9999px]',
      },
    },
    defaultVariants: { size: 'md', shape: 'rounded' },
  },
)
export const switchThumbClassName = [
  'pointer-events-none absolute top-0.5 start-0.5 flex size-(--switch-thumb-size) items-center justify-center',
  'rounded-(--switch-thumb-radius) bg-[var(--switch-thumb-background,var(--background))] text-[var(--switch-thumb-color,var(--primary))] shadow-sm',
  'transition-[inset-inline-start] duration-150 ease-out motion-reduce:transition-none',
  'group-data-[state=checked]/switch:start-[calc(100%-var(--switch-thumb-size)-2px)]',
  '[&>[data-slot=spinner]]:size-[70%] [&>svg]:size-[70%]',
].join(' ')
export const switchContentClassName = [
  'pointer-events-none invisible col-start-1 row-start-1 inline-flex items-center justify-center gap-1 whitespace-nowrap py-0.5 leading-none',
  'data-[state=checked]:ps-1.5 data-[state=checked]:pe-[calc(var(--switch-thumb-size)+6px)]',
  'data-[state=unchecked]:ps-[calc(var(--switch-thumb-size)+6px)] data-[state=unchecked]:pe-1.5',
  'group-data-[state=checked]/switch:data-[state=checked]:visible',
  'group-data-[state=unchecked]/switch:data-[state=unchecked]:visible',
  '[&>svg]:size-[1em]',
].join(' ')
