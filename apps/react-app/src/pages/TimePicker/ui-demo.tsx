import { Card } from '@fex-design/react/ui/card'
import { TimePicker } from '@fex-design/react/ui/time-picker'
export function UiDemo() {
  return <Card title="UI TimePicker" description="UI 只组装 Primitive，支持同一套时间状态、输入解析和禁用规则。">
    <div className="flex flex-wrap gap-3">
      <TimePicker className="w-56" defaultValue={{ hour: 9, minute: 30, second: 0 }} />
      <TimePicker className="w-56" use12Hours step={{ minute: 5 }} />
      <TimePicker triggerRender={({ props, ref }) => <button {...props} ref={ref} type="button" className="rounded-md border border-border px-3 py-2">自定义触发元素</button>} />
    </div>
  </Card>
}
