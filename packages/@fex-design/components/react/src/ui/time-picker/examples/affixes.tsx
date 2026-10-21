import { TimePicker } from '@fex-design/react/ui/time-picker'

export function TimePickerAffixesExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="grid gap-2">
        <p>默认时钟后缀</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} />
      </section>
      <section className="grid gap-2">
        <p>自定义前缀与后缀</p>
        <TimePicker prefix="预约" suffix="时" defaultValue={{ hour: 9, minute: 30, second: 0 }} />
      </section>
      <section className="grid gap-2">
        <p>自定义时区后缀</p>
        <TimePicker prefix="时间" suffix="UTC" defaultValue={{ hour: 9, minute: 30, second: 0 }} />
      </section>
    </div>
  )
}
