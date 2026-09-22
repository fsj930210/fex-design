import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }]

export default function Example() {
  return <Select className="w-72" options={options} multiple defaultValue={['react', 'vue']} maxTagCount={2} />
}
