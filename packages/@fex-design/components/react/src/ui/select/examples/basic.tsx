import { Select } from '@fex-design/react/ui/select'
const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'solid', label: 'Solid', disabled: true },
]
export default function Example() {
  return (
    <div className="min-h-64 p-8">
      <Select
        className="w-72"
        items={items}
        defaultValue="react"
        placeholder="请选择框架"
        clearable
      />
    </div>
  )
}
