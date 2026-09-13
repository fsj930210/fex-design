import type { JSX } from 'solid-js'
import { Checkbox } from '../../ui/checkbox/checkbox'

interface DataTableCheckboxProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'checked'
> {
  checked: boolean
  indeterminate?: boolean
}

export function DataTableCheckbox(props: DataTableCheckboxProps) {
  return <Checkbox {...props} />
}
