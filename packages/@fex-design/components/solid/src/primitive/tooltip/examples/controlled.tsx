import { createSignal } from 'solid-js'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/solid/primitive/tooltip'
import { Button } from '@fex-design/solid/primitive/button'
export function ControlledExample() {
  const [open, setOpen] = createSignal(false)
  return (
    <div class="flex min-h-64 items-center justify-center gap-3">
      <Button onClick={() => setOpen(!open())}>外部{open() ? '关闭' : '打开'}</Button>
      <TooltipRoot open={open()} onOpenChange={setOpen}>
        <TooltipTrigger>
          {(trigger) => (
            <Button {...trigger.props} ref={trigger.ref} variant="outlined">
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
