import { Badge } from '@fex-design/solid/ui/badge'
export function Overflow() {
  return (
    <div class="flex items-center gap-6">
      <Badge count={120} overflowCount={99}>
        <span class="block size-10 rounded bg-muted-background" />
      </Badge>
      <Badge count={0} showZero>
        <span class="block size-10 rounded bg-muted-background" />
      </Badge>
    </div>
  )
}
