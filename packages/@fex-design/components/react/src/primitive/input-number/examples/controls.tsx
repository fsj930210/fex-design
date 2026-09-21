import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
export function ControlsExample() {
  return (
    <div className="grid w-full gap-3">
      <p>默认控制</p>
      <InputNumberRoot defaultValue={8}>
        <InputNumberControl />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
      <p>隐藏控制</p>
      <InputNumberRoot defaultValue={8}>
        <InputNumberControl />
      </InputNumberRoot>
    </div>
  )
}
