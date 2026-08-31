import { A } from '@solidjs/router'
import {
  BasicDemo,
  ClearDemo,
  ControlledDemo,
  CustomPanelDemo,
  CustomTriggerDemo,
  CustomTriggerEventDemo,
  DisabledAlphaDemo,
  DisabledDemo,
  FormatDemo,
  GradientDemo,
  PresetsDemo,
  TriggerTextDemo,
} from './demos'
export function ColorPickerPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">ColorPicker</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            可组合的单色与线性渐变选择原子，原生支持 OKLCH。
          </p>
        </header>
        <div class="grid gap-4">
          <BasicDemo />
          <ControlledDemo />
          <GradientDemo />
          <TriggerTextDemo />
          <DisabledDemo />
          <DisabledAlphaDemo />
          <ClearDemo />
          <CustomTriggerDemo />
          <CustomTriggerEventDemo />
          <FormatDemo />
          <PresetsDemo />
          <CustomPanelDemo />
        </div>
      </div>
    </main>
  )
}
