import { useState } from 'react'
import { Dropdown } from '@fex-design/react/ui/dropdown'
export function DropdownCustomItemExample() {
  const [selected, setSelected] = useState('尚未选择')
  const items = [
    { value: 'edit', label: '编辑资料', textValue: '编辑' },
    { value: 'archive', label: '归档项目', textValue: '归档' },
  ]
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Dropdown
        items={items}
        onActivate={(info) => setSelected(info.value)}
        renderItem={(item, binding) => (
          <button
            {...binding.props}
            className={`${binding.props.className ?? ''} flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm`}
          >
            <span>{item.label}</span>
            <kbd>{item.value === 'edit' ? '⌘ E' : '⌘ A'}</kbd>
          </button>
        )}
      >
        选择操作
      </Dropdown>
      <output>最近操作：{selected}</output>
    </div>
  )
}
