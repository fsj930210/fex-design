import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from '@fex-design/react/primitive/select'
const items = Array.from({ length: 1000 }, (_, index) => ({
  value: index,
  label: `项目 ${index + 1}`,
}))
export default function Example() {
  return (
    <SelectRoot items={items} showSearch virtual={{ itemHeight: 32, overscan: 4 }}>
      <SelectTrigger className="w-72" placeholder="搜索项目"><SelectValue /></SelectTrigger>
      <SelectContent>
        {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
      </SelectContent>
    </SelectRoot>
  )
}
