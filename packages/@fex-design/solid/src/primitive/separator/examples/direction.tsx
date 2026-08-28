import { Separator } from '@fex-design/solid/primitive/separator'

export function DirectionDemo() {
  return (
    <div class="grid w-full gap-4">
      <div class="grid gap-4">
        <div dir="ltr" class="grid gap-2">
          <strong>LTR</strong>
          <div class="flex items-center gap-2">
            <span>Start</span>
            <Separator class="flex-1" />
            <span>End</span>
          </div>
        </div>
        <div dir="rtl" class="grid gap-2">
          <strong>RTL</strong>
          <div class="flex items-center gap-2">
            <span>Start</span>
            <Separator class="flex-1" />
            <span>End</span>
          </div>
        </div>
      </div>
    </div>
  )
}
