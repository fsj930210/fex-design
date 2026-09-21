import { cva } from 'class-variance-authority'

export const tagClassName = cva(
  [
    'inline-flex max-w-full min-w-0 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border font-normal whitespace-nowrap',
    'transition-[color,background-color,border-color,opacity] data-[disabled=true]:opacity-50',
    '[&>svg]:pointer-events-none [&>svg]:shrink-0',
    '[--tag-semantic-color:var(--muted-foreground)] [--tag-semantic-color-foreground:var(--background)]',
  ].join(' '),
  {
    variants: {
      variant: {
        filled:
          'border-transparent bg-[color-mix(in_oklch,var(--tag-color,var(--tag-semantic-color))_12%,transparent)] text-[var(--tag-color,var(--tag-semantic-color))]',
        outlined:
          'border-[color-mix(in_oklch,var(--tag-color,var(--tag-semantic-color))_45%,transparent)] bg-transparent text-[var(--tag-color,var(--tag-semantic-color))]',
        solid:
          'border-[var(--tag-color,var(--tag-semantic-color))] bg-[var(--tag-color,var(--tag-semantic-color))] text-[var(--tag-color-foreground,var(--tag-semantic-color-foreground))]',
      },
      color: {
        primary:
          '[--tag-semantic-color:var(--tag-color-primary,var(--color-primary))] [--tag-semantic-color-foreground:var(--tag-color-primary-foreground,var(--color-primary-foreground))]',
        success:
          '[--tag-semantic-color:var(--tag-color-success,var(--color-success))] [--tag-semantic-color-foreground:var(--tag-color-success-foreground,var(--color-success-foreground))]',
        warning:
          '[--tag-semantic-color:var(--tag-color-warning,var(--color-warning))] [--tag-semantic-color-foreground:var(--tag-color-warning-foreground,var(--color-warning-foreground))]',
        danger:
          '[--tag-semantic-color:var(--tag-color-danger,var(--color-danger))] [--tag-semantic-color-foreground:var(--tag-color-danger-foreground,var(--color-danger-foreground))]',
        info: '[--tag-semantic-color:var(--tag-color-info,var(--color-info))] [--tag-semantic-color-foreground:var(--tag-color-info-foreground,var(--color-info-foreground))]',
      },
      size: {
        sm: 'h-5 gap-1 px-1.5 text-xs leading-[18px] [&>svg]:size-2.5',
        md: 'h-6 gap-1 px-2 text-xs leading-5 [&>svg]:size-3',
        lg: 'h-7 gap-1.5 px-2.5 text-sm leading-6 [&>svg]:size-3.5',
      },
    },
    defaultVariants: { variant: 'filled', size: 'md' },
  },
)

export const tagActionClassName = [
  '-me-0.5 ms-0.5 inline-flex size-[1em] shrink-0 items-center justify-center text-current opacity-55 outline-none',
  'hover:opacity-100 focus-visible:rounded-[2px] focus-visible:ring-1 focus-visible:ring-current',
  'disabled:pointer-events-none disabled:opacity-30 [&>svg]:size-2.5',
].join(' ')
