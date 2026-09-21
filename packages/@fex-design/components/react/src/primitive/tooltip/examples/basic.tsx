import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/primitive/button'

export function BasicExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <TooltipRoot>
        <TooltipTrigger>{(props) => <Button {...props}>悬停或聚焦</Button>}</TooltipTrigger>
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
