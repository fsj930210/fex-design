import { Badge } from '@fex-design/react/ui/badge'

export function CssVariables() {
  return (
    <div className="flex items-center gap-4 [--badge-color-danger:#e11d48] [--badge-color-success:#059669]">
      <Badge count="success" color="success" />
            <Badge count="danger" color="danger" />
      <Badge
        count={8}
        className="[--badge-color:#7c3aed] [--badge-font-size:0.875rem] [--badge-height:2rem] [--badge-min-width:2rem] [--badge-padding-inline:0.5rem]"
      />
      <Badge dot className="[--badge-color:#0ea5e9] [--badge-dot-size:0.75rem]" />
    </div>
  )
}
