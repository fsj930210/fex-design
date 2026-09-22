import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'beijing', label: '北京' }, { value: 'shanghai', label: '上海' }, { value: 'shenzhen', label: '深圳' }]

export default function Example() {
  return <Select className="w-72" options={options} searchable filterOption={(keyword, option) => option.label.includes(keyword)} placeholder="搜索城市" />
}
