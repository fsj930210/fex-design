import { Badge, BadgeDot } from '@fex-design/react/primitive/badge'

export function CssVariables() {
  return (
    <div className="flex items-center gap-4">
      <Badge
        count={8}
        className="[--badge-color:#7c3aed] [--badge-font-size:0.875rem] [--badge-height:2rem] [--badge-min-width:2rem] [--badge-padding-inline:0.5rem]"
      />
      <BadgeDot className="[--badge-color:#0ea5e9] [--badge-dot-size:0.75rem]" />
    </div>
  )
}
