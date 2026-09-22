import { useState } from 'react'
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }]

export default function Example() {
  const [value, setValue] = useState('react')
  return <SelectRoot options={options} value={value} onChange={(next) => setValue(String(next))}><SelectTrigger className="w-72" placeholder="请选择框架" /><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></SelectRoot>
}
