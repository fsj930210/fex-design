import { Select } from '@fex-design/react/ui/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'solid', label: 'Solid', disabled: true },
]
export default function Example() {
  return (
    <Select
      className="w-72"
      options={options}
      defaultValue="react"
      placeholder="请选择框架"
      clearable
    />
  )
}
