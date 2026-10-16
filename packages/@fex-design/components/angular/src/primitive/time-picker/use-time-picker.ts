import { computed, DestroyRef, inject, Injectable, signal, type Signal } from '@angular/core'
import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import type { TimePickerController, TimePickerControllerOptions, TimePickerSnapshot } from '@fex-design/core/time-picker/types'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

@Injectable()
export class TimePickerState {
  private readonly destroyRef = inject(DestroyRef)
  private instance?: TimePickerController
  private readonly store = signal<Signal<TimePickerSnapshot> | null>(null)
  readonly snapshot = computed(() => {
    const store = this.store()
    if (!store) throw new Error('TimePickerState requires initial options before use.')
    return store()
  })
  get controller(): TimePickerController {
    if (!this.instance) throw new Error('TimePickerState requires initial options before use.')
    return this.instance
  }
  setOptions(options: TimePickerControllerOptions) {
    if (this.instance) this.instance.setOptions(options)
    else {
      this.instance = createTimePickerController(options)
      this.store.set(createCoreStoreSignal(this.instance, this.destroyRef))
    }
  }
}
