import { A } from '@solidjs/router'
import { BasicDemos } from './basic-demos'
import { CustomDemos } from './custom-demos'
import { IntegrationDemos } from './integration-demos'
import { PickerDemos } from './picker-demos'
import { StatusDemos } from './status-demos'

export function DatePickerPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-6xl space-y-4">
        <header class="space-y-4">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            返回首页
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">DatePicker</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              DatePicker primitive 组合 Input、Popover 和
              Calendar，示例覆盖单选、多选、范围、禁用、面板切换和自定义渲染。
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <BasicDemos />
          <StatusDemos />
          <PickerDemos />
          <CustomDemos />
          <IntegrationDemos />
        </div>
      </div>
    </main>
  )
}
