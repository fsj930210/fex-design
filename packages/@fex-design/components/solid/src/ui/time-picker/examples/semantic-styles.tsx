import {
  TimePicker,
  type TimePickerClassNames,
  type TimePickerStyles,
} from '@fex-design/solid/ui/time-picker'
import type { JSX } from 'solid-js'

const classNames: TimePickerClassNames = {
  root: 'rounded-xl border-purple-500',
  input: 'font-semibold text-purple-950',
  popup: 'rounded-xl border-purple-300',
  panel: 'bg-purple-50',
  column: 'border-purple-200',
  item: 'rounded-md',
  selectedItem: '!bg-purple-200 !text-purple-950',
}
const styles: TimePickerStyles<JSX.CSSProperties> = {
  root: {
    'border-color': '#7c3aed',
    'border-radius': '12px',
  },
  input: {
    color: '#5b21b6',
    'font-weight': 600,
  },
  popup: {
    'border-color': '#c4b5fd',
    'border-radius': '12px',
  },
  panel: {
    'background-color': '#f5f3ff',
  },
  column: {
    'border-color': '#ddd6fe',
  },
  item: {
    'border-radius': '6px',
  },
  selectedItem: {
    'background-color': '#ddd6fe',
    color: '#4c1d95',
  },
}

export function TimePickerSemanticStylesExample() {
  return (
    <div class="grid w-full gap-4">
      <section class="grid gap-2">
        <p>classNames</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} classNames={classNames} />
      </section>
      <section class="grid gap-2">
        <p>styles</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} styles={styles} />
      </section>
    </div>
  )
}
