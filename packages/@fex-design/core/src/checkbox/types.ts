import type { SnapshotStore } from '../store/create-store'

export type CheckboxCheckedState = boolean | 'indeterminate'

export type CheckboxValue = string | number

export interface CheckboxGroupSnapshot {
  value: CheckboxValue[]
  disabled: boolean
}

export interface CheckboxGroupChangeMeta {
  previousValue: CheckboxValue[]
  value: CheckboxValue[]
  changedValue: CheckboxValue | undefined
  checked: boolean | undefined
}

export interface CheckboxGroupOptions {
  value?: readonly CheckboxValue[] | undefined
  defaultValue?: readonly CheckboxValue[] | undefined
  disabled?: boolean | undefined
  disabledValues?: readonly CheckboxValue[] | undefined
  onChange?: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => void
}

export interface CheckboxGroupController extends SnapshotStore<CheckboxGroupSnapshot> {
  isChecked: (value: CheckboxValue) => boolean
  isDisabled: (value: CheckboxValue) => boolean
  check: (value: CheckboxValue) => CheckboxGroupChangeMeta | undefined
  uncheck: (value: CheckboxValue) => CheckboxGroupChangeMeta | undefined
  toggle: (value: CheckboxValue) => CheckboxGroupChangeMeta | undefined
  setValue: (value: readonly CheckboxValue[]) => CheckboxGroupChangeMeta | undefined
  clear: () => CheckboxGroupChangeMeta | undefined
  checkAll: (values: readonly CheckboxValue[]) => CheckboxGroupChangeMeta | undefined
  uncheckAll: (values: readonly CheckboxValue[]) => CheckboxGroupChangeMeta | undefined
  toggleAll: (values: readonly CheckboxValue[]) => CheckboxGroupChangeMeta | undefined
  getCheckedState: (values: readonly CheckboxValue[]) => CheckboxCheckedState
}
