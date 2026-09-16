import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'
export function BasicExample() {
  return (
    <div class="flex min-h-64 items-center justify-center">
      <Tooltip title="将鼠标移到这段提示上仍会保持显示">
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref}>
            悬停或聚焦
          </Button>
        )}
      </Tooltip>
    </div>
  )
}
