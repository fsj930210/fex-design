import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/solid/primitive/tooltip'
import { Button } from '@fex-design/solid/ui/button'
export function BasicExample() {
  return (
    <div class="flex min-h-64 items-center justify-center">
      <TooltipRoot>
        <TooltipTrigger>
          {(trigger) => (
            <Button {...trigger.props} ref={trigger.ref}>
              悬停或聚焦
            </Button>
          )}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            将鼠标移到这段提示上仍会保持显示
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  )
}
