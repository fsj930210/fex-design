import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/solid/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
export function KeyboardExample() {
  return (
    <div class="grid w-full gap-2">
      <p>ArrowUp 增加，ArrowDown 减少</p>
      <InputNumberRoot defaultValue={5}>
        <InputNumberControl />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
