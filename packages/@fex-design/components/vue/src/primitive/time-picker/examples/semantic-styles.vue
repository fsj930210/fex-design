<script setup lang="ts">
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerSemanticStylesExample' })
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
</script>
<template>
  <div class="grid w-full gap-4">
    <section class="grid gap-2">
      <p>classNames</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger
          :class="classNames.root"
          :input-props="{ class: classNames.input }" /><TimePickerPortal
          ><TimePickerContent :class="classNames.popup"
            ><TimePickerPanel :class="classNames.panel"
              ><TimePickerHourColumn
                :class="classNames.column"
                :item-class-name="classNames.item"
                :selected-item-class-name="classNames.selectedItem" /><TimePickerMinuteColumn
                :class="classNames.column"
                :item-class-name="classNames.item"
                :selected-item-class-name="classNames.selectedItem" /><TimePickerSecondColumn
                :class="classNames.column"
                :item-class-name="classNames.item"
                :selected-item-class-name="
                  classNames.selectedItem
                " /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="grid gap-2">
      <p>styles</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger
          :style="styles.root"
          :input-props="{ style: styles.input }" /><TimePickerPortal
          ><TimePickerContent :style="styles.popup"
            ><TimePickerPanel :style="styles.panel"
              ><TimePickerHourColumn
                :style="styles.column"
                :item-style="styles.item"
                :selected-item-style="styles.selectedItem" /><TimePickerMinuteColumn
                :style="styles.column"
                :item-style="styles.item"
                :selected-item-style="styles.selectedItem" /><TimePickerSecondColumn
                :style="styles.column"
                :item-style="styles.item"
                :selected-item-style="
                  styles.selectedItem
                " /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
  </div>
</template>
