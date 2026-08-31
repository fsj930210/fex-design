import { Badge } from '@fex-design/solid/ui/badge'

export function Dot() {
  return (
    <div class="flex items-center gap-6">
      <Badge dot color="danger">
        📣
      </Badge>
      <Badge dot color="danger">
        <a href="#badge-dot" class="text-primary">
          Link something
        </a>
      </Badge>
    </div>
  )
}
