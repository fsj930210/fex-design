import { InputNumber } from '@fex-design/react/ui/input-number'
export function ValidationExample() {
  return (
    <div className="grid w-full gap-1.5">
      <label htmlFor="purchase-quantity">购买数量</label>
      <InputNumber
        id="purchase-quantity"
        defaultValue={8}
        aria-invalid="true"
        aria-describedby="purchase-quantity-error"
      />
      <p id="purchase-quantity-error" className="text-sm text-danger">
        购买数量不能超过当前库存 5
      </p>
    </div>
  )
}
