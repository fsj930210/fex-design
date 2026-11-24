import { Dropdown, type DropdownProps } from '@fex-design/react/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'copy', label: '复制' },
]
const cases: { label: string; options: NonNullable<DropdownProps['popoverProps']> }[] = [
  { label: '点击', options: { trigger: ['click'] } },
  { label: '悬停', options: { trigger: ['hover'] } },
  { label: '聚焦', options: { trigger: ['focus'] } },
  { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
  { label: '悬停延迟', options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 } },
]
export function DropdownTriggersExample() {
  return (
    <div className="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
      {cases.map(({ label, options }) => (
        <Dropdown key={label} items={items} popoverProps={options}>
          {label}
        </Dropdown>
      ))}
    </div>
  )
}
