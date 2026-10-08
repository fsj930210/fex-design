import type { ComponentProps } from 'react'
import { useListboxContext } from './listbox-context'

export function ListboxGroup({ className, ...props }: ComponentProps<'div'>) {
  const context = useListboxContext('ListboxGroup')
  return (
    <div
      {...props}
      role="group"
      data-slot="listbox-group"
      data-orientation={context.orientation}
      className={className}
    />
  )
}
