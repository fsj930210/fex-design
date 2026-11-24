import { Dropdown } from '@fex-design/solid/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'share', label: '分享', children: [{ value: 'link', label: '复制链接' }] },
]
export function DropdownDirectionExample() {
  return (
    <div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div dir={dir} class="flex flex-col items-start gap-3">
          <span>{dir.toUpperCase()}</span>
          <Dropdown items={items} menuProps={{ dir }}>
            操作
          </Dropdown>
        </div>
      ))}
    </div>
  )
}
