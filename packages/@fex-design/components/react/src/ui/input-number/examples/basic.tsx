import { InputNumber } from '@fex-design/react/ui/input-number'
export function BasicExample() {
  return (
    <div className="grid w-full gap-3">
      <label htmlFor="quantity">数量</label>
      <InputNumber id="quantity" defaultValue={8} />
      <p className="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
    </div>
  )
}
