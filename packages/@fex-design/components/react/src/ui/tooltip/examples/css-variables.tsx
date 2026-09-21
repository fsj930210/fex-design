import type { CSSProperties } from 'react'
import { Tooltip } from '@fex-design/react/ui/tooltip'
import { Button } from '@fex-design/react/ui/button'

const tooltipStyle = {
  '--tooltip-background': '#164e63',
  '--tooltip-foreground': '#ecfeff',
  '--tooltip-content-max-width': '180px',
  '--tooltip-motion-duration': '300ms',
} as CSSProperties

export function CssVariablesExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <Tooltip title="CSS Variables 同时控制颜色、宽度和动效时长。" style={tooltipStyle}>
        <Button>CSS Variables</Button>
      </Tooltip>
    </div>
  )
}
