import { Badge, BadgeDot } from '@fex-design/react/primitive/badge'
export function Basic() {
  return (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex">
        <span className="block size-10 rounded bg-muted-background" />
        <Badge count={5} className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2" />
      </span>
      <span className="relative inline-flex">
        <span className="block size-10 rounded bg-muted-background" />
        <Badge
          count="new"
          color="success"
          className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
        />
      </span>
      <BadgeDot color="success" />
    </div>
  )
}
