import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/react/primitive/time-picker'

const classNames = {
  root: 'rounded-xl border-purple-500',
  input: 'font-semibold text-purple-950',
  popup: 'rounded-xl border-purple-300',
  panel: 'bg-purple-50',
  column: 'border-purple-200',
  item: 'rounded-md',
  selectedItem: '!bg-purple-200 !text-purple-950',
}
const styles = {
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
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger
            className={classNames.root}
            inputProps={{ className: classNames.input }}
          />
          <TimePickerPortal>
            <TimePickerContent className={classNames.popup}>
              <TimePickerPanel className={classNames.panel}>
                <TimePickerHourColumn
                  className={classNames.column}
                  itemClassName={classNames.item}
                  selectedItemClassName={classNames.selectedItem}
                />
                <TimePickerMinuteColumn
                  className={classNames.column}
                  itemClassName={classNames.item}
                  selectedItemClassName={classNames.selectedItem}
                />
                <TimePickerSecondColumn
                  className={classNames.column}
                  itemClassName={classNames.item}
                  selectedItemClassName={classNames.selectedItem}
                />
              </TimePickerPanel>
            </TimePickerContent>
          </TimePickerPortal>
        </TimePickerRoot>
      </section>
      <section className="grid gap-2">
        <p>styles</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger style={styles.root} inputProps={{ style: styles.input }} />
          <TimePickerPortal>
            <TimePickerContent style={styles.popup}>
              <TimePickerPanel style={styles.panel}>
                <TimePickerHourColumn
                  style={styles.column}
                  itemStyle={styles.item}
                  selectedItemStyle={styles.selectedItem}
                />
                <TimePickerMinuteColumn
                  style={styles.column}
                  itemStyle={styles.item}
                  selectedItemStyle={styles.selectedItem}
                />
                <TimePickerSecondColumn
                  style={styles.column}
                  itemStyle={styles.item}
                  selectedItemStyle={styles.selectedItem}
                />
              </TimePickerPanel>
            </TimePickerContent>
          </TimePickerPortal>
        </TimePickerRoot>
      </section>
    </div>
  )
}
