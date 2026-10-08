import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressCircleClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { progressContext } from './progress-context'

@Component({
  selector: 'svg[progressCircle]',
  standalone: true,
  exportAs: 'progressCircle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-circle',
    '[attr.data-status]': 'root.status()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.width]': 'root.size()',
    '[attr.height]': 'root.size()',
    '[style.transform]': 'transform()',
  },
})
export class ProgressCircle {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<SVGSVGElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  readonly gapDegree = input<number>()
  readonly rotation = input<number>()
  protected readonly geometry = computed(() => {
    const normalized = this.root.normalized()
    return getProgressGeometry({
      value: normalized.value, min: normalized.min, max: normalized.max,
      size: this.root.size(), thickness: this.root.thickness(),
      variant: this.root.variant(), gapDegree: this.gapDegree(),
    })
  })
  protected readonly viewBox = computed(() => `0 0 ${this.root.size()} ${this.root.size()}`)
  protected readonly transform = computed(() => `rotate(${this.rotation() ?? this.geometry().rotation}deg)`)
  protected readonly hostClassName = createHostClassName(() => cn(progressCircleClassName, this.className()))
}
