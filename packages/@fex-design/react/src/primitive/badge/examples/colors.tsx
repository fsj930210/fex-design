import { Badge, BadgeDot } from '@fex-design/react/primitive/badge'
const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
export function Colors() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {colors.map((color) => (
        <div key={color} className="grid justify-items-center gap-2">
          <Badge color={color}>{color}</Badge>
          <span className="inline-flex items-center gap-1.5">
            <BadgeDot color={color} />
            {color}
          </span>
        </div>
      ))}
      <div className="grid justify-items-center gap-2">
        <Badge color="#7c3aed">custom</Badge>
        <span className="inline-flex items-center gap-1.5">
          <BadgeDot color="#7c3aed" />
          #7c3aed
        </span>
      </div>
    </div>
  )
}
