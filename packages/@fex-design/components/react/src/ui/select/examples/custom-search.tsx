import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }]
const filter = (keyword: string, option: { label: string }) => { let from = 0; return [...keyword.toLowerCase()].every((character) => { const index = option.label.toLowerCase().indexOf(character, from); from = index + 1; return index >= 0 }) }

export default function Example() {
  return <Select className="w-72" options={options} searchable filterOption={filter} placeholder="输入 rt 试试" />
}
