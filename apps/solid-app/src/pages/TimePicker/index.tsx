import { A } from '@solidjs/router'
import { ControlledDemo } from './controlled-demo'
import { TwelveHourDemo } from './twelve-hour-demo'
import { StepDemo } from './step-demo'
import { FormatDemo } from './format-demo'
import { InputDemo } from './input-demo'
import { RangeDemo } from './range-demo'
import { DisabledTimeDemo } from './disabled-time-demo'
import { DecorationDemo } from './decoration-demo'
import { PanelExtraDemo } from './panel-extra-demo'
import { DisabledDemo } from './disabled-demo'
export function TimePickerPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header>
          <A href="/">Back home</A>
          <h1 class="text-2xl font-semibold">TimePicker Primitive</h1>
        </header>
        <div class="space-y-4">
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
