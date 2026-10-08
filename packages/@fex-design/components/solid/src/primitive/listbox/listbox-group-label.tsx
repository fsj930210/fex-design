import { type JSX, type ParentProps } from 'solid-js'

export function ListboxGroupLabel(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return <div {...props} data-slot="listbox-group-label" />
}
