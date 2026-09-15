import { RadioButtonGroup, RadioGroup } from '@fex-design/react/ui/radio'
const options = [
  { label: '苹果', value: 'apple' },
  { label: '梨', value: 'pear' },
] as const
export default function Example() {
  return (
    <div className="grid gap-4">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">Radio</span>
        <RadioGroup defaultValue="apple" orientation="horizontal" options={options} />
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">RadioButton</span>
        <RadioButtonGroup defaultValue="apple" orientation="horizontal" options={options} />
      </section>
    </div>
  )
}
