import { useSelector, type AnyFormState } from '@tanstack/solid-form'
import type { Accessor, JSX } from 'solid-js'
import { useRootContext } from './context'
export function FormSubscribe<TSelected>(props: {
  selector: (state: AnyFormState) => TSelected
  children: (value: Accessor<TSelected>) => JSX.Element
}) {
  const selected = useSelector(useRootContext().form.store, (state) => props.selector(state))
  return props.children(selected)
}
