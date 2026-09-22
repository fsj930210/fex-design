import { SelectContent, SelectGroup, SelectItem, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'

const frontend = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]
const backend = [{ value: 'nest', label: 'NestJS' }, { value: 'spring', label: 'Spring' }]
const options = [...frontend, ...backend]

export default function Example() {
  return <SelectRoot options={options}><SelectTrigger className="w-72" placeholder="请选择框架" /><SelectContent><SelectGroup label="前端框架">{frontend.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectGroup><SelectGroup label="后端框架">{backend.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectGroup></SelectContent></SelectRoot>
}
