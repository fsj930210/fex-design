import { Radio, RadioButton, RadioGroup } from '@fex-design/react/primitive/radio'
export default function Example() {
  return (
    <div className="grid gap-4">
      <section className="grid gap-2" dir="ltr">
        <span>中文 LTR</span>
        <RadioGroup defaultValue="cn" orientation="horizontal">
          <label>
            <Radio value="cn" /> 中文
          </label>
        </RadioGroup>
        <RadioGroup defaultValue="cn" orientation="horizontal" className="gap-0">
          <RadioButton value="cn">中文按钮</RadioButton>
        </RadioGroup>
      </section>
      <section className="grid gap-2" dir="rtl">
        <span>العربية RTL</span>
        <RadioGroup defaultValue="ar" orientation="horizontal">
          <label>
            <Radio value="ar" /> العربية
          </label>
        </RadioGroup>
        <RadioGroup defaultValue="ar" orientation="horizontal" className="gap-0">
          <RadioButton value="ar">زر عربي</RadioButton>
        </RadioGroup>
      </section>
    </div>
  )
}
