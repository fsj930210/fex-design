import { Badge } from '@fex-design/solid/ui/badge'
import { BadgeDot } from '@fex-design/solid/primitive/badge'
const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
export function Colors() {
  return (
    <div class="flex w-full flex-wrap justify-center gap-4">
      {colors.map((color) => (
        <div class="grid justify-items-center gap-2">
          <Badge color={color}>{color}</Badge>
          <span class="inline-flex items-center gap-1.5">
            <BadgeDot color={color} />
            {color}
          </span>
        </div>
      ))}
      <div class="grid justify-items-center gap-2">
        <Badge color="#7c3aed">custom</Badge>
        <span class="inline-flex items-center gap-1.5">
          <BadgeDot color="#7c3aed" />
          #7c3aed
        </span>
      </div>
    </div>
  )
}
