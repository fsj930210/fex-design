export const inputNumberStyleDemo = {
  value: 12,
  prefix: '$',
  suffix: 'USD',
} as const

export const inputNumberSemanticClasses = {
  root: 'w-full border-violet-500 bg-violet-50 shadow-sm',
  prefix: 'bg-violet-200 px-2 font-bold text-violet-900',
  control: 'font-bold text-violet-950',
  clear: 'text-rose-600 hover:bg-rose-100',
  suffix: 'bg-amber-200 px-2 font-bold text-amber-950',
  actions: 'bg-cyan-100',
  increment: 'text-emerald-700 hover:bg-emerald-200',
  decrement: 'text-rose-700 hover:bg-rose-200',
} as const

export const inputNumberVariableClasses = {
  root: 'w-full [--input-border-color:#a78bfa] [--input-background:#f5f3ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--primary:#6d28d9] [--muted-background:#ede9fe]',
  prefix: 'bg-muted-background px-2 text-primary',
  control: 'font-medium',
  clear: 'text-primary hover:bg-primary/10',
  suffix: 'bg-muted-background px-2 text-primary',
  actions: 'bg-muted-background',
  increment: 'text-primary hover:bg-primary/10',
  decrement: 'text-primary hover:bg-primary/10',
} as const
