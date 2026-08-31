import { Badge } from '@fex-design/solid/ui/badge'
export function Custom() {
  return (
    <div class="flex gap-3">
      <Badge count="NEW" />
      <Badge count="hot" color="danger" />
      <Badge count="3 items" color="info" />
    </div>
  )
}
