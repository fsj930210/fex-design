import { Link } from 'react-router'
import { ControlledDemo } from './controlled-demo'
import { DecorationDemo } from './decoration-demo'
import { DisabledDemo } from './disabled-demo'
import { DisabledTimeDemo } from './disabled-time-demo'
import { FormatDemo } from './format-demo'
import { InputDemo } from './input-demo'
import { PanelExtraDemo } from './panel-extra-demo'
import { RangeDemo } from './range-demo'
import { StepDemo } from './step-demo'
import { TwelveHourDemo } from './twelve-hour-demo'
export function TimePickerPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-1.5">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold">TimePicker Primitive</h1>
          <p className="text-sm text-muted-foreground">
            专用时间列、共享滚动交互与 Input/Popover 组合示例。
          </p>
        </header>
        <div className="space-y-4">
          <ControlledDemo />
          <TwelveHourDemo />
          <StepDemo />
          <FormatDemo />
          <InputDemo />
          <RangeDemo />
          <DisabledTimeDemo />
          <DecorationDemo />
          <PanelExtraDemo />
          <DisabledDemo />
        </div>
      </div>
    </main>
  )
}
