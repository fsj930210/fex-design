import { cn } from '@fex-design/utils'
import { Directive, computed, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressCircleTrackClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { progressContext } from './progress-context'

@Directive({
  selector: 'circle[progressCircleTrack]',
  standalone: true,
  exportAs: 'progressCircleTrack',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-circle-track',
    '[attr.cx]': 'geometry().center',
    '[attr.cy]': 'geometry().center',
    '[attr.r]': 'geometry().radius',
    fill: 'none',
    stroke: 'currentColor',
    '[attr.stroke-width]': 'root.thickness()',
    '[attr.stroke-dasharray]': 'geometry().trackDasharray',
    '[attr.stroke-linecap]': "trackLinecap() ?? 'round'",
    pathLength: '100',
  },
})
export class ProgressCircleTrack {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<SVGCircleElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  readonly gapDegree = input<number>()
  readonly trackLinecap = input<ProgressLinecap>()
  protected readonly geometry = computed(() => {
    const normalized = this.root.normalized()
    return getProgressGeometry({
      value: normalized.value, min: normalized.min, max: normalized.max,
      size: this.root.size(), thickness: this.root.thickness(),
      variant: this.root.variant(), gapDegree: this.gapDegree(),
    })
  })
  protected readonly hostClassName = createHostClassName(() => cn(progressCircleTrackClassName, this.className()))
}
