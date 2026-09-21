import { Radio, RadioButton, RadioGroup } from '@fex-design/solid/primitive/radio'
export default function Example() {
  return (
    <div class="grid gap-4">
      <RadioGroup defaultValue="checked" orientation="horizontal">
        <label>
          <Radio value="empty" /> 未选中
        </label>
        <label>
          <Radio value="checked" /> 已选中
        </label>
        <label>
          <Radio value="disabled" disabled /> 禁用
        </label>
      </RadioGroup>
      <RadioGroup defaultValue="checked" orientation="horizontal" class="gap-0">
        <RadioButton value="empty">未选中</RadioButton>
        <RadioButton value="checked">已选中</RadioButton>
        <RadioButton value="disabled" disabled>
          禁用
        </RadioButton>
      </RadioGroup>
    </div>
  )
}
