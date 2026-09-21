import { Radio, RadioButton, RadioGroup } from '@fex-design/solid/ui/radio'
export default function Example() {
  return (
    <div class="grid gap-4">
      <RadioGroup defaultValue="cn" orientation="horizontal" dir="ltr">
        <Radio value="cn">中文</Radio>
      </RadioGroup>
      <RadioGroup defaultValue="cn" class="gap-0" dir="ltr">
        <RadioButton value="cn">中文按钮</RadioButton>
      </RadioGroup>
      <RadioGroup defaultValue="ar" orientation="horizontal" dir="rtl">
        <Radio value="ar">العربية</Radio>
      </RadioGroup>
      <RadioGroup defaultValue="ar" class="gap-0" dir="rtl">
        <RadioButton value="ar">زر عربي</RadioButton>
      </RadioGroup>
    </div>
  )
}
