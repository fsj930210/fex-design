import { computed, DestroyRef, inject, Injectable, signal, type Signal } from '@angular/core'
import { createTimeRangePickerController } from '@fex-design/core/time-picker/create-time-range-picker-controller'
import type {
  TimeRangePickerController,
  TimeRangePickerOptions,
  TimeRangePickerSnapshot,
} from '@fex-design/core/time-picker/range-types'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

@Injectable()
export class TimeRangePickerState {
  private readonly destroyRef = inject(DestroyRef)
  private instance?: TimeRangePickerController
  private readonly store = signal<Signal<TimeRangePickerSnapshot> | null>(null)
  readonly snapshot = computed(() => {
    const store = this.store()
    if (!store) throw new Error('TimeRangePickerState requires initial options before use.')
    return store()
  })
  get controller(): TimeRangePickerController {
    if (!this.instance) throw new Error('TimeRangePickerState requires initial options before use.')
    return this.instance
  }
  setOptions(options: TimeRangePickerOptions) {
    if (this.instance) this.instance.setOptions(options)
    else {
      this.instance = createTimeRangePickerController(options)
      this.store.set(createCoreStoreSignal(this.instance, this.destroyRef))
    }
  }
}
