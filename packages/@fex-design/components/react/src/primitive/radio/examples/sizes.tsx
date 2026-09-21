import { Radio, RadioButton, RadioGroup } from '@fex-design/react/primitive/radio'
export default function Example() {
  return (
    <div className="grid gap-4">
      <section className="grid gap-2">
        <span>Radio</span>
        <RadioGroup defaultValue="md" orientation="horizontal">
          <label className="inline-flex items-center gap-2">
            <Radio value="sm" size="sm" />
            sm · 14px
          </label>
          <label className="inline-flex items-center gap-2">
            <Radio value="md" size="md" />
            md · 16px
          </label>
          <label className="inline-flex items-center gap-2">
            <Radio value="lg" size="lg" />
            lg · 20px
          </label>
        </RadioGroup>
      </section>
      <section className="grid gap-2">
        <span>RadioButton（复用全局 Button 高度）</span>
        <RadioGroup defaultValue="md" orientation="horizontal" className="gap-0">
          <RadioButton value="sm" size="sm">
            sm · 24px
          </RadioButton>
          <RadioButton value="md" size="md">
            md · 32px
          </RadioButton>
          <RadioButton value="lg" size="lg">
            lg · 44px
          </RadioButton>
        </RadioGroup>
      </section>
    </div>
  )
}
