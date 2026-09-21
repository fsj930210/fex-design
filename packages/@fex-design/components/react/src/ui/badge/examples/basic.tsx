import { Badge } from '@fex-design/react/ui/badge'
import { BadgeDot } from '@fex-design/react/primitive/badge'
export function Basic() {
  return (
    <div className="flex items-center gap-6">
      <Badge count={5}>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
      <Badge count="new" color="success">
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
      <BadgeDot color="success" />
    </div>
  )
}
