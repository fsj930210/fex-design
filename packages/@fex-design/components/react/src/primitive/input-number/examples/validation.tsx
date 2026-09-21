import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
export function ValidationExample() {
  return (
    <div className="grid w-full gap-1.5">
      <label htmlFor="purchase-quantity">购买数量</label>
      <InputNumberRoot defaultValue={8}>
        <InputNumberControl
          id="purchase-quantity"
          aria-invalid="true"
          aria-describedby="purchase-quantity-error"
        />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
      <p id="purchase-quantity-error" className="text-sm text-danger">
        购买数量不能超过当前库存 5
      </p>
    </div>
  )
}
