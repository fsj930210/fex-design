import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
export function DropdownCustomItemExample() {
  const [selected, setSelected] = createSignal('尚未选择')
  const items = [
    { value: 'edit', label: '编辑资料', textValue: '编辑' },
    { value: 'archive', label: '归档项目', textValue: '归档' },
  ]
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Dropdown
        items={items}
        onActivate={(info) => setSelected(info.value)}
        renderItem={(item, binding) => (
          <button
            {...binding.props}
            class={`${binding.props.class ?? ''} flex items-center justify-between gap-6`}
          >
            <span>{item.label}</span>
            <kbd>{item.value === 'edit' ? '⌘ E' : '⌘ A'}</kbd>
          </button>
        )}
      >
        选择操作
      </Dropdown>
      <output>最近操作：{selected()}</output>
    </div>
  )
}
