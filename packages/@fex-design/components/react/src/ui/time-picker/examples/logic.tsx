import { useTimePicker } from '@fex-design/react/primitive/time-picker'

const hours = Array.from({ length: 24 }, (_, value) => value)
const minutes = Array.from({ length: 60 }, (_, value) => value)
const seconds = Array.from({ length: 60 }, (_, value) => value)

export function TimePickerUseTimePickerExample() {
  const { controller, snapshot } = useTimePicker({
    defaultValue: { hour: 9, minute: 30, second: 0 },
  })
  return (
    <section className="grid w-full gap-4 rounded-lg border p-4">
      <label className="grid gap-2">
        Time input
        <input
          type="time"
          step="1"
          value={snapshot.inputValue}
          onChange={(event) => controller.input(event.currentTarget.value)}
        />
      </label>
      <fieldset className="grid gap-2">
        <legend>Custom time picker</legend>
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Hour"
            value={snapshot.value?.hour ?? ''}
            onChange={(event) => controller.selectHour(Number(event.target.value))}
          >
            {hours.map((value) => (
              <option key={value} value={value}>
                {String(value).padStart(2, '0')}
              </option>
            ))}
          </select>
          <span>:</span>
          <select
            aria-label="Minute"
            value={snapshot.value?.minute ?? ''}
            onChange={(event) => controller.selectMinute(Number(event.target.value))}
          >
            {minutes.map((value) => (
              <option key={value} value={value}>
                {String(value).padStart(2, '0')}
              </option>
            ))}
          </select>
          <span>:</span>
          <select
            aria-label="Second"
            value={snapshot.value?.second ?? ''}
            onChange={(event) => controller.selectSecond(Number(event.target.value))}
          >
            {seconds.map((value) => (
              <option key={value} value={value}>
                {String(value).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <output aria-live="polite">{snapshot.inputValue}</output>
    </section>
  )
}
