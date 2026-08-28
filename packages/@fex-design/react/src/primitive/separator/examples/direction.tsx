import { Separator } from '@fex-design/react/primitive/separator'

export function DirectionDemo() {
  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-4">
        <div dir="ltr" className="grid gap-2">
          <strong>LTR</strong>
          <div className="flex items-center gap-2">
            <span>Start</span>
            <Separator className="flex-1" />
            <span>End</span>
          </div>
        </div>
        <div dir="rtl" className="grid gap-2">
          <strong>RTL</strong>
          <div className="flex items-center gap-2">
            <span>Start</span>
            <Separator className="flex-1" />
            <span>End</span>
          </div>
        </div>
      </div>
    </div>
  )
}
