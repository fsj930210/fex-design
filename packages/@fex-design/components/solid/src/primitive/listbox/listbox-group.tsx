import { type JSX, type ParentProps } from 'solid-js'
import { useListboxContext } from './listbox-context'

export function ListboxGroup(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const context = useListboxContext('ListboxGroup')
  return (
    <div {...props} role="group" data-slot="listbox-group" data-orientation={context.orientation} />
  )
}
