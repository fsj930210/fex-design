import { Badge } from '@fex-design/react/ui/badge'

export function Dot() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Badge dot color="danger">
        📣
      </Badge>
      <Badge dot color="danger">
        <a href="#badge-dot" className="text-primary">
          Link something
        </a>
      </Badge>
    </div>
  )
}
