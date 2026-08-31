import { Badge } from '@fex-design/react/ui/badge'
export function Offset() {
  return (
    <div className="flex items-center gap-8">
      <Badge count={5}>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
      <Badge count={5} offset={[10, 10]}>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
    </div>
  )
}
