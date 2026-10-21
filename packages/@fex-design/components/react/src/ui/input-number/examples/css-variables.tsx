import { InputNumber } from '@fex-design/react/ui/input-number'
import {
  inputNumberStyleDemo as demo,
  inputNumberVariableClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

export function InputNumberCssVariablesExample() {
  return (
    <div className="grid w-full gap-3">
      <InputNumber
        defaultValue={demo.value}
        prefix={demo.prefix}
        suffix={demo.suffix}
        clearable
        classNames={classNames}
      />
    </div>
  )
}
