import { normalizeSelectOptions } from '@fex-design/core/select/normalize-options'
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'

const users = [{ profileId: 1, displayName: '张三' }, { profileId: 2, displayName: '李四', disabled: true }]
const options = normalizeSelectOptions(users, { value: 'profileId', label: 'displayName' })

export default function Example() {
  return <SelectRoot options={options} defaultValue={1}><SelectTrigger className="w-72" placeholder="请选择用户" /><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></SelectRoot>
}
