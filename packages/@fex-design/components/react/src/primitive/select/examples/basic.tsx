import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValue } from '@fex-design/react/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
export default function Example() {
  return (
    <SelectRoot options={options} defaultValue="react" clearable>
      <SelectTrigger className="w-72" placeholder="请选择框架"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frameworks</SelectLabel>
          {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  )
}
