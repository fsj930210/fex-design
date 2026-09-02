import { Separator } from '@fex-design/react/primitive/separator'

export function DirectionDemo() {
  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-4">
        <div dir="ltr" className="grid gap-2">
          <strong>LTR · 中文示例</strong>
          <div className="flex items-center gap-2">
            <span>开始</span>
            <Separator className="flex-1" />
            <span>结束</span>
          </div>
        </div>
        <div dir="rtl" className="grid gap-2">
          <strong>RTL · مثال عربي</strong>
          <div className="flex items-center gap-2">
            <span>البداية</span>
            <Separator className="flex-1" />
            <span>النهاية</span>
          </div>
        </div>
      </div>
    </div>
  )
}
