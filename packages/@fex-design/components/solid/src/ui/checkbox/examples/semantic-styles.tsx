import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'
export default function Example() {
  return (
    <Checkbox
      defaultChecked
      classNames={{
        root: 'gap-3',
        control: 'ring-2 ring-orange-300',
        indicator: 'drop-shadow-sm',
        label: 'font-bold',
      }}
      styles={{
        control: { 'background-color': '#ea580c', 'border-color': '#c2410c' },
        indicator: { color: '#ffffff' },
        label: { color: '#6d28d9' },
      }}
    >
      结构化样式
    </Checkbox>
  )
}
