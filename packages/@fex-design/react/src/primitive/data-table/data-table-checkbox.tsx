import type { InputHTMLAttributes } from 'react'
import { Checkbox } from '../../ui/checkbox/checkbox'

interface DataTableCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'checked' | 'defaultChecked'
> {
  checked: boolean
  indeterminate?: boolean
}

export function DataTableCheckbox(props: DataTableCheckboxProps) {
  return <Checkbox {...props} />
}
