import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'
export function ColorExample() {
  return (
    <div class="flex flex-wrap items-center justify-center gap-4">
      <Tooltip color="#1677ff" title="品牌蓝 Tooltip">
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref}>
            品牌蓝
          </Button>
        )}
      </Tooltip>
      <Tooltip color="#722ed1" title="紫色 Tooltip">
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref}>
            紫色
          </Button>
        )}
      </Tooltip>
      <Tooltip color="#d4380d" title="暖红色 Tooltip">
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref}>
            暖红色
          </Button>
        )}
      </Tooltip>
    </div>
  )
}
