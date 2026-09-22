import { Select } from '@fex-design/react/ui/select'
const options = Array.from({ length: 1000 }, (_, index) => ({
  value: index,
  label: `项目 ${index + 1}`,
}))
export default function Example() {
  return (
    <Select
      className="w-72"
      options={options}
      searchable
      virtual={{ itemHeight: 32, overscan: 4 }}
      placeholder="搜索 1000 个项目"
    />
  )
}
