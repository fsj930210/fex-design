export const cardClassName = [
  'group/card block overflow-hidden rounded-[var(--card-radius,var(--radius-md))]',
  '[border:var(--card-border,1px_solid_var(--border))] shadow-[var(--card-shadow,none)]',
].join(' ')

export const cardHeaderClassName = [
  'group/card-header grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1',
  'bg-[var(--card-header-background,var(--card-background,var(--elevated-background)))] p-[var(--card-header-padding,1rem)]',
  '[border-bottom:var(--card-header-divider,1px_solid_var(--border))]',
].join(' ')

export const cardTitleClassName =
  'col-start-1 row-start-1 min-w-0 text-base font-medium leading-snug text-foreground'

export const cardDescriptionClassName = 'col-start-1 row-start-2 min-w-0 text-sm text-muted-foreground'

export const cardExtraClassName = 'col-start-2 row-span-2 row-start-1 self-start justify-self-end'

export const cardContentClassName = [
  'bg-[var(--card-content-background,var(--card-background,var(--elevated-background)))]',
  'p-[var(--card-content-padding,1rem)]',
].join(' ')

export const cardFooterClassName = [
  'flex items-center bg-[var(--card-footer-background,var(--card-background,var(--elevated-background)))]',
  '[border-top:var(--card-footer-divider,1px_solid_var(--border))] p-[var(--card-footer-padding,1rem)]',
].join(' ')
