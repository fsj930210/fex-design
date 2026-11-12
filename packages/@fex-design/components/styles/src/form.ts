export const formRootClassName = [
  'grid',
  'gap-[var(--form-gap,var(--space-xl,1rem))]',
  'min-w-0',
].join(' ')
export const formFieldClassName = [
  'grid',
  'gap-[var(--form-item-gap,var(--space-sm,0.375rem))]',
  'min-w-0',
].join(' ')
export const formLabelClassName = [
  'inline-flex w-fit items-center gap-1 text-sm font-medium',
  'text-[var(--form-label-color,var(--foreground))]',
  'data-[required=true]:after:content-["*"] data-[required=true]:after:text-danger',
].join(' ')
export const formDescriptionClassName =
  'text-sm text-[var(--form-description-color,var(--muted-foreground))]'
export const formErrorClassName = 'text-sm text-[var(--form-error-color,var(--danger))]'
export const formGroupClassName =
  'grid min-w-0 gap-[var(--form-gap,var(--space-xl,1rem))] border-0 p-0'
export const formLegendClassName = 'mb-2 text-sm font-semibold text-foreground'

/** Shared by Primitive and UI; bindings and validation remain independent of layout. */
export const formLayoutClassName = [
  '[&[data-layout=inline]]:flex',
  '[&[data-layout=inline]]:flex-wrap',
  '[&[data-layout=inline]]:items-start',
  '[&[data-layout=inline]_[data-slot=form-field]]:max-w-full',
  '[&[data-layout=horizontal]_[data-slot=form-field]:has(>[data-slot=form-label])]:grid-cols-[var(--form-label-width,7rem)_minmax(0,1fr)]',
  '[&[data-layout=inline]_[data-slot=form-field]:has(>[data-slot=form-label])]:grid-cols-[fit-content(var(--form-label-width,7rem))_minmax(8rem,1fr)]',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-field]]:gap-x-[var(--form-label-gap,0.5rem)]',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:col-start-1',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:row-start-1',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:self-center',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:block',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:w-full',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:min-w-0',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:max-w-full',
  '[&[data-label-align=end]:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-label]]:text-end',
  '[&[data-label-align=start]_[data-slot=form-label]]:text-start',
  '[&[data-label-wrap=false]_[data-slot=form-label]]:truncate',
  '[&[data-label-wrap=true]_[data-slot=form-label]]:whitespace-normal',
  '[&[data-label-wrap=true]_[data-slot=form-label]]:wrap-anywhere',
  '[&:is([data-layout=horizontal],[data-layout=inline])_[data-slot=form-field]:has(>[data-slot=form-label])>:not([data-slot=form-label])]:col-start-2',
  '[&[data-layout=horizontal]_[data-slot=form-actions]]:ms-[calc(var(--form-label-width,7rem)+var(--form-label-gap,0.5rem))]',
].join(' ')
export function formLayoutStyle(
  labelWidth: string | number = '7rem',
  labelGap: string | number = '0.5rem',
) {
  return {
    '--form-label-width': typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth,
    '--form-label-gap': typeof labelGap === 'number' ? labelGap + 'px' : labelGap,
  }
}
