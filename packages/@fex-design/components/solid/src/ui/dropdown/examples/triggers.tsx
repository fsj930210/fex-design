import { Dropdown } from '@fex-design/solid/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'copy', label: '复制' },
]
const cases = [
  { label: '点击', options: { trigger: ['click'] as const } },
  { label: '悬停', options: { trigger: ['hover'] as const } },
  { label: '聚焦', options: { trigger: ['focus'] as const } },
  { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] as const } },
  {
    label: '悬停延迟',
    options: { trigger: ['hover'] as const, hoverOpenDelay: 300, hoverCloseDelay: 400 },
  },
]
export function DropdownTriggersExample() {
  return (
    <div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
      {cases.map((item) => (
        <Dropdown items={items} popoverProps={item.options}>
          {item.label}
        </Dropdown>
      ))}
    </div>
  )
}
