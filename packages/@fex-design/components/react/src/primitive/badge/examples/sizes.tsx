import type { BadgeSize } from '@fex-design/core'
import { Badge, BadgeDot } from '@fex-design/react/primitive/badge'

const sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']

export function Sizes() {
  return (
    <div className="grid gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-sm text-muted-foreground">{size}</span>
          <Badge count={8} size={size} />
          <BadgeDot color="success" size={size} />
        </div>
      ))}
    </div>
  )
}
