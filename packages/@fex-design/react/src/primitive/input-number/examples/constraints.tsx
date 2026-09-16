import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
export function ConstraintsExample() {
  return (
    <div className="grid w-full gap-2">
      <p>范围：0–10 · 步长：0.25 · 精度：2</p>
      <InputNumberRoot defaultValue={8.25} min={0} max={10} step={0.25} precision={2}>
        <InputNumberControl />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
