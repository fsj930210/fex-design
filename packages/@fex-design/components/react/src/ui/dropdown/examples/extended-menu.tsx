import { useState } from 'react'
import { Button } from '@fex-design/react/ui/button'
import { Dropdown } from '@fex-design/react/ui/dropdown'
export function DropdownExtendedMenuExample() {
  const [extended, setExtended] = useState(true)
  const [selected, setSelected] = useState('尚未选择')
  const items = [
    { value: 'edit', label: '编辑' },
    { value: 'copy', label: '复制' },
    ...(extended
      ? [
          { type: 'separator' as const, key: 'line' },
          {
            type: 'group' as const,
            key: 'extra',
            label: '扩展操作',
            children: [
              { value: 'archive', label: '归档' },
              { value: 'export', label: '导出' },
            ],
          },
        ]
      : []),
  ]
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setExtended(!extended)}>{extended ? '隐藏' : '显示'}扩展操作</Button>
      <Dropdown items={items} onActivate={(info) => setSelected(info.value)}>
        操作
      </Dropdown>
      <output>最近操作：{selected}</output>
    </div>
  )
}
