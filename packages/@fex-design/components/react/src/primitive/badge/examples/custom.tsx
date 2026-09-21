import { Badge } from '@fex-design/react/primitive/badge'
export function Custom() {
  return (
    <div className="flex gap-3">
      <Badge count="NEW" />
      <Badge count="hot" color="danger" />
      <Badge count="3 items" color="info" />
    </div>
  )
}
