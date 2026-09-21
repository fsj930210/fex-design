import { InputNumber } from '@fex-design/solid/ui/input-number'
export function ValidationExample() {
  return (
    <div class="grid w-full gap-1.5">
      <label for="purchase-quantity">购买数量</label>
      <InputNumber
        id="purchase-quantity"
        defaultValue={8}
        aria-invalid="true"
        aria-describedby="purchase-quantity-error"
      />
      <p id="purchase-quantity-error" class="text-sm text-danger">
        购买数量不能超过当前库存 5
      </p>
    </div>
  )
}
