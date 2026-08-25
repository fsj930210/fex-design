import { cva } from 'class-variance-authority'

export const buttonPrimitiveClassName = [
  'group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap',
  '[--button-height:var(--button-height-default,var(--height-default))] [--button-icon-size:var(--button-icon-size-default,var(--icon-size-default))] [--button-content-gap:0.25rem]',
  'h-(--button-height) gap-(--button-content-gap) rounded-md border border-border bg-background bg-clip-padding px-2.5 text-sm font-medium text-foreground',
  'hover:bg-muted-background',
  'cursor-pointer select-none outline-none transition-all active:brightness-90',
  'focus-visible:border-[var(--button-color-border)] focus-visible:ring-3 focus-visible:ring-[color-mix(in_srgb,var(--button-color)_35%,transparent)]',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  'data-[loading=true]:pointer-events-none data-[loading=true]:cursor-wait data-[loading=true]:opacity-75',
  'aria-pressed:bg-primary/80 aria-pressed:text-primary-foreground aria-pressed:ring-2 aria-pressed:ring-primary/30',
  'aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-(--button-icon-size)',
].join(' ')

export const buttonClassName = cva(buttonPrimitiveClassName, {
  variants: {
    variant: {
      solid:
        'border-transparent bg-[var(--button-color)] text-[var(--button-color-foreground)] hover:bg-[var(--button-color-hover)]',
      outlined:
        'border-[var(--button-color-border)] bg-background text-[var(--button-color)] hover:bg-[var(--button-color-soft)]',
      dashed:
        'border-dashed border-[var(--button-color-border)] bg-background text-[var(--button-color)] hover:bg-[var(--button-color-soft)]',
      filled:
        'border-transparent bg-[var(--button-color-soft)] text-[var(--button-color)] hover:bg-[var(--button-color-soft-hover)]',
      text: 'border-transparent bg-transparent text-[var(--button-color)] hover:bg-[var(--button-color-soft)]',
      link: 'h-auto border-transparent bg-transparent px-0 text-[var(--button-color)] underline-offset-4 [--button-underline-inset:0px] hover:bg-transparent hover:underline',
    },
    color: {
      default:
        '[--button-color:var(--foreground)] [--button-color-foreground:var(--background)] [--button-color-hover:color-mix(in_srgb,var(--foreground)_85%,var(--background))] [--button-color-soft:var(--muted-background)] [--button-color-soft-hover:var(--hover-background)] [--button-color-border:var(--border)]',
      primary:
        '[--button-color:var(--primary)] [--button-color-foreground:var(--primary-foreground)] [--button-color-hover:color-mix(in_srgb,var(--primary)_85%,var(--background))] [--button-color-soft:var(--selected-background)] [--button-color-soft-hover:color-mix(in_srgb,var(--primary)_16%,var(--background))] [--button-color-border:var(--selected-border)]',
      danger:
        '[--button-color:var(--danger)] [--button-color-foreground:var(--danger-foreground)] [--button-color-hover:color-mix(in_srgb,var(--danger)_85%,var(--background))] [--button-color-soft:var(--danger-background)] [--button-color-soft-hover:color-mix(in_srgb,var(--danger)_18%,var(--background))] [--button-color-border:var(--danger-border)]',
      warning:
        '[--button-color:var(--warning)] [--button-color-foreground:var(--warning-foreground)] [--button-color-hover:color-mix(in_srgb,var(--warning)_85%,var(--background))] [--button-color-soft:var(--warning-background)] [--button-color-soft-hover:color-mix(in_srgb,var(--warning)_20%,var(--background))] [--button-color-border:var(--warning-border)]',
      success:
        '[--button-color:var(--success)] [--button-color-foreground:var(--success-foreground)] [--button-color-hover:color-mix(in_srgb,var(--success)_85%,var(--background))] [--button-color-soft:var(--success-background)] [--button-color-soft-hover:color-mix(in_srgb,var(--success)_18%,var(--background))] [--button-color-border:var(--success-border)]',
      info: '[--button-color:var(--info)] [--button-color-foreground:var(--info-foreground)] [--button-color-hover:color-mix(in_srgb,var(--info)_85%,var(--background))] [--button-color-soft:var(--info-background)] [--button-color-soft-hover:color-mix(in_srgb,var(--info)_18%,var(--background))] [--button-color-border:var(--info-border)]',
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
        '[--button-height:var(--button-height-default,var(--height-default))] [--button-icon-size:var(--button-icon-size-default,var(--icon-size-default))] px-2.5 [--button-underline-inset:10px]',
      xs: '[--button-height:var(--button-height-xs,var(--height-xs))] [--button-icon-size:var(--button-icon-size-xs,var(--icon-size-xs))] px-2 text-xs [--button-underline-inset:8px]',
      sm: '[--button-height:var(--button-height-sm,var(--height-sm))] [--button-icon-size:var(--button-icon-size-sm,var(--icon-size-sm))] px-2.5 text-[0.8rem] [--button-underline-inset:8px]',
      lg: '[--button-height:var(--button-height-lg,var(--height-lg))] [--button-icon-size:var(--button-icon-size-lg,var(--icon-size-lg))] px-3 [--button-underline-inset:10px]',
      xl: '[--button-height:var(--button-height-xl,var(--height-xl))] [--button-icon-size:var(--button-icon-size-xl,var(--icon-size-xl))] px-4 text-base [--button-underline-inset:12px]',
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
    variant: 'outlined',
    color: 'default',
    size: 'default',
  },
})

const buttonIconBaseClassName = 'inline-flex shrink-0 items-center justify-center empty:hidden'

const buttonExpandIconClassName = [
  'group-data-[effect=expand-icon]/button:w-0 group-data-[effect=expand-icon]/button:overflow-hidden group-data-[effect=expand-icon]/button:opacity-0 group-data-[effect=expand-icon]/button:transition-all group-data-[effect=expand-icon]/button:duration-200',
  'group-data-[effect=expand-icon]/button:group-hover/button:w-[calc(var(--button-icon-size)+var(--button-content-gap))] group-data-[effect=expand-icon]/button:group-hover/button:opacity-100',
  'group-data-[effect=expand-icon]/button:group-focus-visible/button:w-[calc(var(--button-icon-size)+var(--button-content-gap))] group-data-[effect=expand-icon]/button:group-focus-visible/button:opacity-100',
  'group-data-[effect=expand-icon]/button:motion-reduce:transition-none',
].join(' ')

export function buttonIconClassName() {
  return [buttonIconBaseClassName, buttonExpandIconClassName].join(' ')
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
