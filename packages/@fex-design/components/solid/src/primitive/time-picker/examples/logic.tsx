import { useTimePicker } from '@fex-design/solid/primitive/time-picker'

const hours = Array.from({ length: 24 }, (_, value) => value)
const minutes = Array.from({ length: 60 }, (_, value) => value)
const seconds = Array.from({ length: 60 }, (_, value) => value)

export function TimePickerUseTimePickerExample() {
  const { controller, snapshot } = useTimePicker({
    defaultValue: { hour: 9, minute: 30, second: 0 },
  })
  return (
    <section class="grid w-full gap-4 rounded-lg border p-4">
      <label class="grid gap-2">
        Time input
        <input
          type="time"
          step="1"
          value={snapshot().inputValue}
          onInput={(event) => controller.input(event.currentTarget.value)}
        />
      </label>
      <fieldset class="grid gap-2">
        <legend>Custom time picker</legend>
        <div class="flex flex-wrap items-center gap-2">
          <select
            aria-label="Hour"
            value={snapshot().value?.hour}
            onChange={(event) => controller.selectHour(Number(event.currentTarget.value))}
          >
            {hours.map((value) => (
              <option value={value}>{String(value).padStart(2, '0')}</option>
            ))}
          </select>
          <span>:</span>
          <select
            aria-label="Minute"
            value={snapshot().value?.minute}
            onChange={(event) => controller.selectMinute(Number(event.currentTarget.value))}
          >
            {minutes.map((value) => (
              <option value={value}>{String(value).padStart(2, '0')}</option>
            ))}
          </select>
          <span>:</span>
          <select
            aria-label="Second"
            value={snapshot().value?.second}
            onChange={(event) => controller.selectSecond(Number(event.currentTarget.value))}
          >
            {seconds.map((value) => (
              <option value={value}>{String(value).padStart(2, '0')}</option>
            ))}
          </select>
        </div>
      </fieldset>
      <output aria-live="polite">{snapshot().inputValue}</output>
    </section>
  )
}
