import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
export function BasicExample() {
  return (
    <div className="grid w-full gap-3">
      <label htmlFor="quantity">数量</label>
      <InputNumberRoot defaultValue={8}>
        <InputNumberControl id="quantity" />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
      <p className="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
    </div>
  )
}
