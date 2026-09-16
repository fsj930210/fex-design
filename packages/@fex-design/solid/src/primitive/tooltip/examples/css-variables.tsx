import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/solid/primitive/tooltip'
import { Button } from '@fex-design/solid/ui/button'

export function CssVariablesExample() {
  return (
    <div class="flex min-h-64 items-center justify-center">
      <TooltipRoot>
        <TooltipTrigger>
          {(trigger) => (
            <Button {...trigger.props} ref={trigger.ref}>
              CSS Variables
            </Button>
          )}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            style={{
              '--tooltip-background': '#164e63',
              '--tooltip-foreground': '#ecfeff',
              '--tooltip-content-max-width': '180px',
              '--tooltip-motion-duration': '300ms',
            }}
          >
            CSS Variables 同时控制颜色、宽度和动效时长。
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  )
}
