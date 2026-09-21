import { Tooltip } from '@fex-design/react/ui/tooltip'
import { Button } from '@fex-design/react/ui/button'
export function BasicExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <Tooltip title="将鼠标移到这段提示上仍会保持显示">
        <Button>悬停或聚焦</Button>
      </Tooltip>
    </div>
  )
}
