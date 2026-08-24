import { cva, type VariantProps } from 'class-variance-authority'

export const buttonPrimitiveClassName = [
  'group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap',
  'h-(--button-height) rounded-md border border-transparent bg-clip-padding text-sm font-medium',
  'cursor-pointer select-none outline-none transition-all',
  'focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus/50',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  'data-[loading=true]:pointer-events-none data-[loading=true]:cursor-wait data-[loading=true]:opacity-75',
  'aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-(--button-icon-size)',
].join(' ')

export const buttonClassName = cva(buttonPrimitiveClassName, {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      outline:
        'border-border bg-background text-foreground hover:bg-muted-background hover:text-foreground aria-expanded:bg-muted-background aria-expanded:text-foreground',
      secondary:
        'bg-secondary-background text-foreground hover:bg-hover-background aria-expanded:bg-secondary-background aria-expanded:text-foreground',
      ghost:
        'text-foreground hover:bg-muted-background hover:text-foreground aria-expanded:bg-muted-background aria-expanded:text-foreground',
      destructive:
        'bg-danger/10 text-danger hover:bg-danger/20 focus-visible:border-danger/40 focus-visible:ring-danger/20',
      link: 'h-auto border-transparent bg-transparent px-0 text-link underline-offset-4 [--button-underline-inset:0px] hover:text-link-hover hover:underline',
      dashed: 'border-dashed border-border bg-background text-foreground hover:bg-muted-background',
    },
    effect: {
      'expand-icon': 'group gap-0 relative',
      'ring-hover':
        'transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2',
      'shine-hover':
        'relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position] hover:before:bg-[position:-100%_0,0_0] focus-visible:before:bg-[position:-100%_0,0_0] before:duration-1000 motion-reduce:before:transition-none',
      'gooey-start':
        'relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:-translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-white/40 before:transition-transform before:duration-1000 hover:before:translate-x-0 hover:before:translate-y-0 focus-visible:before:translate-x-0 focus-visible:before:translate-y-0 rtl:before:translate-x-[150%] rtl:hover:before:translate-x-0 rtl:focus-visible:before:translate-x-0 motion-reduce:before:transition-none',
      'gooey-end':
        'relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-white/40 before:transition-transform before:duration-1000 hover:before:translate-x-0 hover:before:translate-y-0 focus-visible:before:translate-x-0 focus-visible:before:translate-y-0 rtl:before:-translate-x-[150%] rtl:hover:before:translate-x-0 rtl:focus-visible:before:translate-x-0 motion-reduce:before:transition-none',
      underline:
        'relative !no-underline after:absolute after:bottom-2 after:start-[var(--button-underline-inset,10px)] after:end-[var(--button-underline-inset,10px)] after:h-px after:origin-bottom-left after:scale-x-100 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0 focus-visible:after:origin-bottom-right focus-visible:after:scale-x-0 rtl:after:origin-bottom-right rtl:hover:after:origin-bottom-left rtl:focus-visible:after:origin-bottom-left motion-reduce:after:transition-none',
      'hover-underline':
        'relative !no-underline after:absolute after:bottom-2 after:start-[var(--button-underline-inset,10px)] after:end-[var(--button-underline-inset,10px)] after:h-px after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100 focus-visible:after:origin-bottom-left focus-visible:after:scale-x-100 rtl:after:origin-bottom-left rtl:hover:after:origin-bottom-right rtl:focus-visible:after:origin-bottom-right motion-reduce:after:transition-none',
      press:
        'active:not-aria-[haspopup]:translate-y-px active:not-aria-[haspopup]:scale-[0.98] motion-reduce:transition-none',
    },
    size: {
      default:
        '[--button-height:var(--button-height-default,var(--height-default))] [--button-icon-size:var(--button-icon-size-default,var(--icon-size-default))] gap-1.5 px-2.5 [--button-underline-inset:10px] has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
      xs: '[--button-height:var(--button-height-xs,var(--height-xs))] [--button-icon-size:var(--button-icon-size-xs,var(--icon-size-xs))] gap-1 px-2 text-xs [--button-underline-inset:8px] has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5',
      sm: '[--button-height:var(--button-height-sm,var(--height-sm))] [--button-icon-size:var(--button-icon-size-sm,var(--icon-size-sm))] gap-1 px-2.5 text-[0.8rem] [--button-underline-inset:8px] has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5',
      lg: '[--button-height:var(--button-height-lg,var(--height-lg))] [--button-icon-size:var(--button-icon-size-lg,var(--icon-size-lg))] gap-1.5 px-3 [--button-underline-inset:10px] has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5',
      xl: '[--button-height:var(--button-height-xl,var(--height-xl))] [--button-icon-size:var(--button-icon-size-xl,var(--icon-size-xl))] gap-2 px-4 text-base [--button-underline-inset:12px] has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3',
      icon: 'w-(--button-height) px-0 [--button-height:var(--button-height-default,var(--height-default))] [--button-icon-size:var(--button-icon-size-default,var(--icon-size-default))]',
      'icon-xs':
        'w-(--button-height) px-0 text-xs [--button-height:var(--button-height-xs,var(--height-xs))] [--button-icon-size:var(--button-icon-size-xs,var(--icon-size-xs))]',
      'icon-sm':
        'w-(--button-height) px-0 text-[0.8rem] [--button-height:var(--button-height-sm,var(--height-sm))] [--button-icon-size:var(--button-icon-size-sm,var(--icon-size-sm))]',
      'icon-lg':
        'w-(--button-height) px-0 [--button-height:var(--button-height-lg,var(--height-lg))] [--button-icon-size:var(--button-icon-size-lg,var(--icon-size-lg))]',
      'icon-xl':
        'w-(--button-height) px-0 text-base [--button-height:var(--button-height-xl,var(--height-xl))] [--button-icon-size:var(--button-icon-size-xl,var(--icon-size-xl))]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const buttonIconBaseClassName = 'inline-flex shrink-0 items-center justify-center'

const buttonExpandIconClassName = {
  start:
    'w-0 translate-x-0 pe-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-[100%] group-hover:pe-2 group-hover:opacity-100 group-focus-visible/button:w-5 group-focus-visible/button:translate-x-[100%] group-focus-visible/button:pe-2 group-focus-visible/button:opacity-100 rtl:group-hover:-translate-x-[100%] rtl:group-focus-visible/button:-translate-x-[100%] motion-reduce:transition-none',
  end: 'w-0 translate-x-[100%] ps-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:ps-2 group-hover:opacity-100 group-focus-visible/button:w-5 group-focus-visible/button:translate-x-0 group-focus-visible/button:ps-2 group-focus-visible/button:opacity-100 rtl:-translate-x-[100%] rtl:group-hover:translate-x-0 rtl:group-focus-visible/button:translate-x-0 motion-reduce:transition-none',
} satisfies Record<'start' | 'end', string>

export function buttonIconClassName({
  placement,
  effect,
}: {
  placement: 'start' | 'end'
  effect?: VariantProps<typeof buttonClassName>['effect']
}) {
  return [
    buttonIconBaseClassName,
    placement === 'end' ? 'order-last' : '',
    effect === 'expand-icon' ? buttonExpandIconClassName[placement] : '',
  ].join(' ')
}

export const buttonSpinnerClassName = 'size-[1em] animate-spin'

export const buttonGroupClassName = cva('inline-flex w-fit items-stretch', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    connected: {
      true: [
        '[&>[data-slot=button]]:rounded-none',
        'data-[orientation=horizontal]:[&>[data-slot=button]:first-child]:rounded-s-md data-[orientation=horizontal]:[&>[data-slot=button]:last-child]:rounded-e-md',
        'data-[orientation=vertical]:[&>[data-slot=button]:first-child]:rounded-t-md data-[orientation=vertical]:[&>[data-slot=button]:last-child]:rounded-b-md',
        'data-[orientation=horizontal]:[&>[data-slot=button]+[data-slot=button]]:-ms-px data-[orientation=vertical]:[&>[data-slot=button]+[data-slot=button]]:-mt-px',
      ].join(' '),
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', connected: true },
})
