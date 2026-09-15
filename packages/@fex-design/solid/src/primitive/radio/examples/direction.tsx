import { Radio, RadioButton, RadioGroup } from '@fex-design/solid/primitive/radio'
export default function Example() {
  return (
    <div class="grid gap-4">
      <RadioGroup defaultValue="cn" orientation="horizontal" dir="ltr">
        <label class="inline-flex items-center gap-2">
          <Radio value="cn" />
          中文
        </label>
      </RadioGroup>
      <RadioGroup defaultValue="cn" class="gap-0" dir="ltr">
        <RadioButton value="cn">中文按钮</RadioButton>
      </RadioGroup>
      <RadioGroup defaultValue="ar" orientation="horizontal" dir="rtl">
        <label class="inline-flex items-center gap-2">
          <Radio value="ar" />
          العربية
        </label>
      </RadioGroup>
      <RadioGroup defaultValue="ar" class="gap-0" dir="rtl">
        <RadioButton value="ar">زر عربي</RadioButton>
      </RadioGroup>
    </div>
  )
}
