import type { ComponentProps } from 'react'

export function ListboxGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="listbox-group-label" className={className} />
}
