import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <Checkbox defaultChecked indicator={<span class="text-xs">★</span>}>
        收藏项目
      </Checkbox>
    </div>
  )
}
