import { Kbd, KbdGroup } from '@fex-design/react/primitive/kbd'
export function DirectionExample() {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div dir={dir} className="grid gap-3 rounded-lg border p-4">
<strong>{dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي'}</strong>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>+</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      ))}
    </div>
  )
}
