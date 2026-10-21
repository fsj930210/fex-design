import {
  TimePicker,
  type TimePickerClassNames,
  type TimePickerStyles,
} from '@fex-design/react/ui/time-picker'
import type { CSSProperties } from 'react'

const classNames: TimePickerClassNames = {
  root: 'rounded-xl border-purple-500',
  input: 'font-semibold text-purple-950',
  popup: 'rounded-xl border-purple-300',
  panel: 'bg-purple-50',
  column: 'border-purple-200',
  item: 'rounded-md',
  selectedItem: '!bg-purple-200 !text-purple-950',
}
const styles: TimePickerStyles<CSSProperties> = {
  root: {
    borderColor: '#7c3aed',
    borderRadius: '12px',
  },
  input: {
    color: '#5b21b6',
    fontWeight: 600,
  },
  popup: {
    borderColor: '#c4b5fd',
    borderRadius: '12px',
  },
  panel: {
    backgroundColor: '#f5f3ff',
  },
  column: {
    borderColor: '#ddd6fe',
  },
  item: {
    borderRadius: '6px',
  },
  selectedItem: {
    backgroundColor: '#ddd6fe',
    color: '#4c1d95',
  },
}

export function TimePickerSemanticStylesExample() {
  return (
    <div className="grid w-full gap-4">
      <section className="grid gap-2">
        <p>classNames</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} classNames={classNames} />
      </section>
      <section className="grid gap-2">
        <p>styles</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} styles={styles} />
      </section>
    </div>
  )
}
