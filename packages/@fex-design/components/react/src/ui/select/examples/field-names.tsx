import { Select } from '@fex-design/react/ui/select'
const users = [
  { profileId: 1, displayName: '张三' },
  { profileId: 2, displayName: '李四', disabled: true },
]
export default function Example() {
  return (
    <Select
      className="w-72"
      options={users}
      fieldNames={{ value: 'profileId', label: 'displayName' }}
      defaultValue={1}
      placeholder="请选择用户"
    />
  )
}
