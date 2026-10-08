import { type JSX, type ParentProps } from 'solid-js'

export function ListboxItemIndicator(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span {...props} aria-hidden="true" data-slot="listbox-item-indicator">
      {props.children}
    </span>
  )
}
