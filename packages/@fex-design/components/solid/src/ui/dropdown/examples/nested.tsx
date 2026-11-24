import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  {
    value: 'share',
    label: '分享',
    children: [
      { value: 'link', label: '复制链接' },
      { value: 'send', label: '发送到', children: [{ value: 'email', label: '电子邮件' }] },
    ],
  },
]
export function DropdownNestedExample() {
  const [value, setValue] = createSignal('尚未选择')
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Dropdown items={items} onActivate={(info) => setValue(info.value)}>
        操作
      </Dropdown>
      <output>最近操作：{value()}</output>
    </div>
  )
}
