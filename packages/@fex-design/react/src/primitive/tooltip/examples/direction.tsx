import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/ui/button'

export function DirectionExample() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex justify-center" dir="ltr">
        <TooltipRoot placement="topLeft" avoidCollisions={false}>
          <TooltipTrigger>{(props) => <Button {...props}>查看中文提示</Button>}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent dir="ltr">
              这是从起始侧对齐的中文提示
              <TooltipArrow />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </div>
      <div className="flex justify-center" dir="rtl">
        <TooltipRoot placement="topLeft" avoidCollisions={false}>
          <TooltipTrigger>{(props) => <Button {...props}>تلميح</Button>}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent dir="rtl">
              تلميح عربي بمحاذاة جهة البداية
              <TooltipArrow />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </div>
    </div>
  )
}
