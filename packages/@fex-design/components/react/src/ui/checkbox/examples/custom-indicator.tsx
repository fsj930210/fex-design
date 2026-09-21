import { Checkbox, CheckboxGroup } from '@fex-design/react/ui/checkbox'

export default function Example() {
  return (
    <div className="grid gap-3">
      <Checkbox defaultChecked indicator={<span className="text-xs">★</span>}>
        收藏项目
      </Checkbox>
    </div>
  )
}
