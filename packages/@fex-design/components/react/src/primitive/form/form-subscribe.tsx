import type { ReactNode } from 'react'
import { useSelector, type AnyFormState } from '@tanstack/react-form'
import { useRootContext } from './context'

export interface FormSubscribeProps<TSelected> {
  selector: (state: AnyFormState) => TSelected
  children: (value: TSelected) => ReactNode
}
export function FormSubscribe<TSelected>({ selector, children }: FormSubscribeProps<TSelected>) {
  const { form } = useRootContext()
  return children(useSelector(form.store, selector))
}
