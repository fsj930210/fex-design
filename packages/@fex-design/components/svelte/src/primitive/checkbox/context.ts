import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { getContext, setContext } from 'svelte'
const rootKey = Symbol('CheckboxRoot'),
  groupKey = Symbol('CheckboxGroup')
export interface RootContext {
  controlId: string
  value?: CheckboxValue
  disabled?: boolean
}
export interface GroupContext {
  value: () => CheckboxValue[]
  disabled: () => boolean
  toggle(value: CheckboxValue): void
}
export const setCheckboxRootContext = (value: RootContext) => setContext(rootKey, value)
export const getCheckboxRootContext = () => getContext<RootContext | undefined>(rootKey)
export const setCheckboxGroupContext = (value: GroupContext) => setContext(groupKey, value)
export const getCheckboxGroupContext = () => getContext<GroupContext | undefined>(groupKey)
