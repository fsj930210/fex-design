import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <Checkbox>未选中</Checkbox>
      <Checkbox defaultChecked>已选中</Checkbox>
      <Checkbox indeterminate>中间状态</Checkbox>
      <Checkbox disabled>禁用</Checkbox>
      <Checkbox defaultChecked disabled>
        禁用且已选中
      </Checkbox>
    </div>
  )
}
