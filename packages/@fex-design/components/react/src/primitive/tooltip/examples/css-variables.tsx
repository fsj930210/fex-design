import type { CSSProperties } from 'react'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/primitive/button'

const tooltipStyle = {
  '--tooltip-background': '#164e63',
  '--tooltip-foreground': '#ecfeff',
  '--tooltip-content-max-width': '180px',
  '--tooltip-motion-duration': '300ms',
} as CSSProperties

export function CssVariablesExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <TooltipRoot>
        <TooltipTrigger>{(props) => <Button {...props}>CSS Variables</Button>}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent style={tooltipStyle}>
            CSS Variables 同时控制颜色、宽度和动效时长。
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  )
}
