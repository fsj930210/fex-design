import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/solid/primitive/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <CheckboxRoot>
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>接收消息通知</CheckboxLabel>
      </CheckboxRoot>
      <div dir="rtl">
        <CheckboxRoot>
          <CheckboxControl defaultChecked />
          <CheckboxIndicator />
          <CheckboxLabel>تلقي إشعارات الرسائل</CheckboxLabel>
        </CheckboxRoot>
      </div>
    </div>
  )
}
