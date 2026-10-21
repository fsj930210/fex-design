import { InputNumber } from '@fex-design/solid/ui/input-number'
import {
  inputNumberStyleDemo as demo,
  inputNumberSemanticClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

export function InputNumberSemanticStylesExample() {
  return (
    <div class="grid w-full gap-3">
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
