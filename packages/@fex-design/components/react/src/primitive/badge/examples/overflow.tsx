import { Badge } from '@fex-design/react/primitive/badge'
export function Overflow() {
  return (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex">
        <span className="block size-10 rounded bg-muted-background" />
        <Badge
          count={120}
          overflowCount={99}
          className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
        />
      </span>
      <span className="relative inline-flex">
        <span className="block size-10 rounded bg-muted-background" />
        <Badge
          count={0}
          showZero
          className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
        />
      </span>
    </div>
  )
}
