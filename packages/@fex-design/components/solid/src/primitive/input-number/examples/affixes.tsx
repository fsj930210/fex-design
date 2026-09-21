import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/solid/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
export function AffixesExample() {
  return (
    <div class="grid w-full gap-2">
      <p>Clear、单位与增减操作可以同时存在</p>
      <InputNumberRoot defaultValue={128}>
        <InputPrefix>￥</InputPrefix>
        <InputNumberControl />
        <InputNumberClear />
        <InputSuffix>元</InputSuffix>
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
