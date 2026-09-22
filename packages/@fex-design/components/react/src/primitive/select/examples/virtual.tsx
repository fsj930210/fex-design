import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'
const options = Array.from({ length: 1000 }, (_, index) => ({
  value: index,
  label: `项目 ${index + 1}`,
}))
export default function Example() {
  return (
    <SelectRoot options={options} showSearch virtual={{ itemHeight: 32, overscan: 4 }}>
      <SelectTrigger className="w-72" placeholder="搜索 1000 个项目" />
      <SelectContent />
    </SelectRoot>
  )
}
