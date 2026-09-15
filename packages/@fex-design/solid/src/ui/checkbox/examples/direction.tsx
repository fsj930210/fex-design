import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <Checkbox defaultChecked>接收消息通知</Checkbox>
      <div dir="rtl">
        <Checkbox defaultChecked>تلقي إشعارات الرسائل</Checkbox>
      </div>
    </div>
  )
}
