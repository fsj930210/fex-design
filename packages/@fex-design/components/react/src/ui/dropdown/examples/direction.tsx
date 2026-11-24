import { Dropdown } from '@fex-design/react/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'share', label: '分享', children: [{ value: 'link', label: '复制链接' }] },
]
export function DropdownDirectionExample() {
  return (
    <div className="flex min-h-64 flex-wrap justify-around gap-8 p-6">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div key={dir} dir={dir} className="flex flex-col items-start gap-3">
          <span>{dir.toUpperCase()}</span>
          <Dropdown items={items} menuProps={{ dir }}>
            操作
          </Dropdown>
        </div>
      ))}
    </div>
  )
}
