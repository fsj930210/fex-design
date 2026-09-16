import { InputNumber } from '@fex-design/react/ui/input-number'
export function AffixesExample() {
  return (
    <div className="grid w-full gap-2">
      <p>Clear、单位与增减操作可以同时存在</p>
      <InputNumber defaultValue={128} clearable prefix="￥" suffix="元" />
    </div>
  )
}
