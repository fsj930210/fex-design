import { Tooltip } from '@fex-design/react/ui/tooltip'
import { Button } from '@fex-design/react/ui/button'
export function ColorExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Tooltip color="#1677ff" title="品牌蓝 Tooltip">
        <Button>品牌蓝</Button>
      </Tooltip>
      <Tooltip color="#722ed1" title="紫色 Tooltip">
        <Button>紫色</Button>
      </Tooltip>
      <Tooltip color="#d4380d" title="暖红色 Tooltip">
        <Button>暖红色</Button>
      </Tooltip>
    </div>
  )
}
