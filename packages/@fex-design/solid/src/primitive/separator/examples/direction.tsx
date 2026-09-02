import { Separator } from '@fex-design/solid/primitive/separator'

export function DirectionDemo() {
  return (
    <div class="grid w-full gap-4">
      <div class="grid gap-4">
        <div dir="ltr" class="grid gap-2">
          <strong>LTR · 中文示例</strong>
          <div class="flex items-center gap-2">
            <span>开始</span>
            <Separator class="flex-1" />
            <span>结束</span>
          </div>
        </div>
        <div dir="rtl" class="grid gap-2">
          <strong>RTL · مثال عربي</strong>
          <div class="flex items-center gap-2">
            <span>البداية</span>
            <Separator class="flex-1" />
            <span>النهاية</span>
          </div>
        </div>
      </div>
    </div>
  )
}
