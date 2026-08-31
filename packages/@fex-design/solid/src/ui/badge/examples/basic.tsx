import { Badge } from '@fex-design/solid/ui/badge'
import { BadgeDot } from '@fex-design/solid/primitive/badge'
export function Basic() {
  return (
    <div class="flex items-center gap-6">
      <Badge count={5}>
        <span class="block size-10 rounded bg-muted-background" />
      </Badge>
      <Badge count="new" color="success">
        <span class="block size-10 rounded bg-muted-background" />
      </Badge>
      <BadgeDot color="success" />
    </div>
  )
}
