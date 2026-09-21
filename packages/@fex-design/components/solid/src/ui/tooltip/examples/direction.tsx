import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'

export function DirectionExample() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="flex justify-center" dir="ltr">
        <Tooltip
          dir="ltr"
          placement="topLeft"
          avoidCollisions={false}
          title="这是从起始侧对齐的中文提示"
        >
          {(trigger) => (
            <Button {...trigger.props} ref={trigger.ref}>
              查看中文提示
            </Button>
          )}
        </Tooltip>
      </div>
      <div class="flex justify-center" dir="rtl">
        <Tooltip
          dir="rtl"
          placement="topLeft"
          avoidCollisions={false}
          title="تلميح عربي بمحاذاة جهة البداية"
        >
          {(trigger) => (
            <Button {...trigger.props} ref={trigger.ref}>
              تلميح
            </Button>
          )}
        </Tooltip>
      </div>
    </div>
  )
}
