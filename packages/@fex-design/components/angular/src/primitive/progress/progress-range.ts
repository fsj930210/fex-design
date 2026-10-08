import { computed, Directive, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressLineRangeClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { progressContext } from './progress-context'

@Directive({
  selector: 'div[progressRange]',
  standalone: true,
  exportAs: 'progressRange',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-range',
    '[attr.data-status]': 'root.status()',
    '[style.width]': 'width()',
    '[style.left]': 'offsetPercent()',
  },
})
export class ProgressRange {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  readonly value = input<number>()
  readonly offset = input<number>()
  protected readonly percentage = computed(() => {
    const value = this.value()
    const normalized = this.root.normalized()
    return value !== undefined
      ? Math.min(1, Math.max(0, (value - normalized.min) / (normalized.max - normalized.min)))
      : normalized.percentage
  })
  protected readonly width = computed(() => this.percentage() === null ? null : `${this.percentage()! * 100}%`)
  protected readonly offsetPercent = computed(() => this.offset() === undefined ? null : `${this.offset()}%`)
  protected readonly hostClassName = createHostClassName(() => cn(progressLineRangeClassName, this.className(), this.offset() !== undefined && 'absolute top-0'))
}
