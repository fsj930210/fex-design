import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValue } from '@fex-design/react/primitive/select'
const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
export default function Example() {
  return (
    <div className="min-h-64 p-8">
      <SelectRoot items={items} defaultValue="react" clearable>
        <SelectTrigger className="w-72" placeholder="请选择框架"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frameworks</SelectLabel>
            {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    </div>
  )
}
