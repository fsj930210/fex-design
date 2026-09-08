import type { InputClassNames, InputSize, InputStyles, InputVariant } from '@fex-design/core/input/types'
import type { CSSProperties } from 'vue'

export interface InputProps {
  modelValue?: string
  defaultValue?: string
  size?: InputSize
  variant?: InputVariant
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  classNames?: InputClassNames
  styles?: InputStyles<CSSProperties>
}
