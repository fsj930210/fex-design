import type { StyleValue } from 'vue'
import type { ScrollbarRoot } from '../scrollbar'

export interface TimePickerColumnCustomization {
  class?: string | undefined
  style?: StyleValue | undefined
  itemClassName?: string | undefined
  itemStyle?: StyleValue | undefined
  selectedItemClassName?: string | undefined
  selectedItemStyle?: StyleValue | undefined
  scrollbarProps?:
    | Omit<InstanceType<typeof ScrollbarRoot>['$props'], 'disabled' | 'overflow'>
    | undefined
}
