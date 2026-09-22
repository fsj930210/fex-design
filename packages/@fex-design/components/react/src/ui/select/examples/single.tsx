import { useState } from 'react'
import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }]

export default function Example() {
  const [value, setValue] = useState('react')
  return <Select className="w-72" options={options} value={value} onChange={(next) => setValue(String(next))} />
}
