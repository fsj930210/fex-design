import { Badge } from '@fex-design/react/ui/badge'
import type { BadgeSize } from '@fex-design/core'

const sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']

export function Sizes() {
  return (
    <div className="grid gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-sm text-muted-foreground">{size}</span>
          <Badge count={8} size={size} />
          <Badge dot color="success" size={size} />
        </div>
      ))}
    </div>
  )
}
