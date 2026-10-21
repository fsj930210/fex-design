import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberClear,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
import {
  inputNumberStyleDemo as demo,
  inputNumberSemanticClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

export function InputNumberSemanticStylesExample() {
  return (
    <div className="grid w-full gap-3">
      <InputNumberRoot defaultValue={demo.value} className={classNames.root}>
        <InputPrefix className={classNames.prefix}>{demo.prefix}</InputPrefix>
        <InputNumberControl className={classNames.control} />
        <InputNumberClear className={classNames.clear} />
        <InputSuffix className={classNames.suffix}>{demo.suffix}</InputSuffix>
        <InputNumberActions className={classNames.actions}>
          <InputNumberIncrement className={classNames.increment} />
          <InputNumberDecrement className={classNames.decrement} />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
