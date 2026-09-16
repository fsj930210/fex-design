import { useState } from 'react'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/ui/button'
export function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-64 items-center justify-center gap-3">
      <Button onClick={() => setOpen((value) => !value)}>外部{open ? '关闭' : '打开'}</Button>
      <TooltipRoot open={open} onOpenChange={setOpen}>
        <TooltipTrigger>
          {(props) => (
            <Button {...props} variant="outlined">
              受控提示
            </Button>
          )}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            状态由调用方管理
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  )
}
