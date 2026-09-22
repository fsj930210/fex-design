import { Select } from '@fex-design/react/ui/select'

const options = [
  { value: 'frontend', label: '前端框架', options: [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] },
  { value: 'backend', label: '后端框架', options: [{ value: 'nest', label: 'NestJS' }, { value: 'spring', label: 'Spring' }] },
]

export default function Example() {
  return <Select className="w-72" options={options} placeholder="请选择框架" />
}
