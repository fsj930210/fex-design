import { cn } from '@fex-design/utils'
import { Directive, computed, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressCircleRangeClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { progressContext } from './progress-context'

@Directive({
  selector: 'circle[progressCircleRange]',
  standalone: true,
  exportAs: 'progressCircleRange',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-circle-range',
    '[attr.data-status]': 'root.status()',
    '[attr.cx]': 'geometry().center',
    '[attr.cy]': 'geometry().center',
    '[attr.r]': 'geometry().radius',
    fill: 'none',
    '[attr.stroke]': "stroke() ?? 'currentColor'",
    '[attr.stroke-width]': 'root.thickness()',
    '[attr.stroke-dasharray]': 'geometry().rangeDasharray',
    '[attr.stroke-dashoffset]': 'geometry().dashOffset',
    '[attr.stroke-linecap]': "linecap() ?? 'round'",
    pathLength: '100',
  },
})
export class ProgressCircleRange {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<SVGCircleElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  readonly gapDegree = input<number>()
  readonly linecap = input<ProgressLinecap>()
  readonly stroke = input<string>()
  protected readonly geometry = computed(() => {
    const normalized = this.root.normalized()
    return getProgressGeometry({
      value: normalized.value, min: normalized.min, max: normalized.max,
      size: this.root.size(), thickness: this.root.thickness(),
      variant: this.root.variant(), gapDegree: this.gapDegree(),
    })
  })
  protected readonly hostClassName = createHostClassName(() => cn(progressCircleRangeClassName, this.className()))
}
