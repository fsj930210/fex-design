import { useRef, useState } from 'react'
import { Dropdown } from '@fex-design/react/ui/dropdown'
export function DropdownSemanticStylesExample() {
  const [value, setValue] = useState('尚未选择')
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <div
        ref={container}
        className="[&_[role=menu]]:border-blue-500 [&_[role=menu]]:bg-blue-50 [&_[role=menu]]:text-blue-950 [&_[role=menuitem]]:font-semibold [&_[role=menuitem]]:hover:bg-blue-200"
      >
        <Dropdown
          items={[
            { value: 'rename', label: '重命名' },
            { value: 'duplicate', label: '复制' },
            { value: 'archive', label: '归档', disabled: true },
          ]}
          popoverProps={{ getPopupContainer: () => container.current }}
          onActivate={(info) => setValue(info.value)}
        >
          操作
        </Dropdown>
      </div>
      <output>最近操作：{value}</output>
    </div>
  )
}
