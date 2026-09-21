import { createSignal } from 'solid-js'
import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'
export function ControlledExample() {
  const [open, setOpen] = createSignal(false)
  return (
    <div class="flex min-h-64 items-center justify-center gap-3">
      <Button onClick={() => setOpen(!open())}>外部{open() ? '关闭' : '打开'}</Button>
      <Tooltip open={open()} onOpenChange={setOpen} title="状态由调用方管理">
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref} variant="outlined">
            受控提示
          </Button>
        )}
      </Tooltip>
    </div>
  )
}
