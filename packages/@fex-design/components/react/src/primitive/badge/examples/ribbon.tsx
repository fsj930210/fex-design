import { BadgeRibbon } from '@fex-design/react/primitive/badge'
const colors = ['primary', 'info', 'success', 'warning', 'danger', '#7c3aed'] as const
export function Ribbon() {
  return (
    <div className="grid w-full max-w-xl gap-4 px-2">
      {colors.map((color) => (
        <div key={color} className="relative">
          <div className="overflow-hidden rounded-lg border">
            <div className="border-b px-4 py-3 font-semibold">{color} Ribbon</div>
            <div className="px-4 py-3 text-muted-foreground">当前颜色：{color}</div>
          </div>
          <BadgeRibbon color={color}>推荐</BadgeRibbon>
        </div>
      ))}
    </div>
  )
}
