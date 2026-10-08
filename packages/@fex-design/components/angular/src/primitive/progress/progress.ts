import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressRootClassName } from '@fex-design/components-styles/progress'
import { normalizeProgressValue, resolveProgressStatus } from '@fex-design/core/progress/progress'
import type { ProgressStatus, ProgressVariant } from '@fex-design/core/progress/types'
import { progressContext } from './progress-context'

@Component({
  selector: 'div[progressRoot]',
  standalone: true,
  providers: [{ provide: progressContext, useFactory: () => inject(Progress).context }],
  exportAs: 'progressRoot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    '[class]': 'hostClassName()',
    role: 'progressbar',
    'data-slot': 'progress',
    '[attr.data-variant]': 'variant()',
    '[attr.data-status]': 'resolvedStatus()',
    '[attr.aria-valuemin]': 'normalized().min',
    '[attr.aria-valuemax]': 'normalized().max',
    '[attr.aria-valuenow]': 'normalized().value',
    '[attr.aria-valuetext]': 'ariaValueText()',
  },
})
export class Progress {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly value = input<number | null>(0)
  readonly min = input(0)
  readonly max = input(100)
  readonly variant = input<ProgressVariant>('line')
  readonly status = input<ProgressStatus>()
  readonly size = input(48)
  readonly thickness = input<number>()
  readonly normalized = computed(() => normalizeProgressValue(this.value(), this.min(), this.max()))
  readonly resolvedStatus = computed(() => resolveProgressStatus(this.status(), this.value(), this.min(), this.max()))
  readonly resolvedThickness = computed(() => this.thickness() ?? (this.variant() === 'line' ? 8 : 4))
  readonly context = { normalized: this.normalized, status: this.resolvedStatus,
    variant: this.variant, size: this.size, thickness: this.resolvedThickness }
  readonly ariaValueText = computed(() => {
    const percentage = this.normalized().percentage
    return percentage === null ? undefined : `${Math.round(percentage * 100)}%`
  })
  protected readonly hostClassName = createHostClassName(progressRootClassName)
}
