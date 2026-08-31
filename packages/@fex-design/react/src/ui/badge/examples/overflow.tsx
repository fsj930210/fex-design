import { Badge } from '@fex-design/react/ui/badge'
export function Overflow() {
  return (
    <div className="flex items-center gap-6">
      <Badge count={120} overflowCount={99}>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
      <Badge count={0} showZero>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
    </div>
  )
}
