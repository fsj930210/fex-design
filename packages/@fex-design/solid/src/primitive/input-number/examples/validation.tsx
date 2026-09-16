import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/solid/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
export function ValidationExample() {
  return (
    <div class="grid w-full gap-1.5">
      <label for="purchase-quantity">购买数量</label>
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
      <p id="purchase-quantity-error" class="text-sm text-danger">
        购买数量不能超过当前库存 5
      </p>
    </div>
  )
}
