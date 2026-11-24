import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
export function DropdownBasicExample() {
  const [value, setValue] = createSignal('尚未选择')
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Dropdown
        items={[
          { value: 'rename', label: '重命名' },
          { value: 'duplicate', label: '复制' },
          { value: 'archive', label: '归档', disabled: true },
        ]}
        onActivate={(info) => setValue(info.value)}
      >
        操作
      </Dropdown>
      <output>最近操作：{value()}</output>
    </div>
  )
}
