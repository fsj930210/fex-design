import { computed, DestroyRef, inject, Injectable, signal, type Signal } from '@angular/core'
import type {
  PaginationSize,
  PaginationController,
  PaginationOptions,
  PaginationSnapshot,
} from '@fex-design/core/pagination/types'
import { usePagination } from './use-pagination'

@Injectable()
export class PaginationState {
  readonly size = signal<PaginationSize>('md')
  private readonly destroyRef = inject(DestroyRef)
  private instance?: PaginationController
  private readonly store = signal<Signal<PaginationSnapshot> | null>(null)
  readonly snapshot = computed(() => {
    const store = this.store()
    if (!store) throw new Error('PaginationState requires initial options before use.')
    return store()
  })
  get controller(): PaginationController {
    if (!this.instance) throw new Error('PaginationState requires initial options before use.')
    return this.instance
  }
  setOptions(options: PaginationOptions) {
    if (this.instance) this.instance.setOptions(options)
    else {
      const pagination = usePagination(options, this.destroyRef)
      this.instance = pagination.controller
      this.store.set(pagination.snapshot)
    }
  }
}
