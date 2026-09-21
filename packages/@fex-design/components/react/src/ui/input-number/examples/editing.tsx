import { InputNumber } from '@fex-design/react/ui/input-number'
export function EditingExample() {
  return (
    <div className="grid w-full gap-2">
      <p>可输入 -、1. 等编辑中间状态，失焦后提交。</p>
      <InputNumber defaultValue={1} precision={2} />
    </div>
  )
}
