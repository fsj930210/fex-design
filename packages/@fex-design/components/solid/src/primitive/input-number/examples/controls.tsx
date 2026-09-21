import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/solid/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
export function ControlsExample() {
  return (
    <div class="grid w-full gap-3">
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
