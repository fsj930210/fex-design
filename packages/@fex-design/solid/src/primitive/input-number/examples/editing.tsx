import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/solid/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
export function EditingExample() {
  return (
    <div class="grid w-full gap-2">
      <p>可输入 -、1. 等编辑中间状态，失焦后提交。</p>
      <InputNumberRoot defaultValue={1} precision={2}>
        <InputNumberControl />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
