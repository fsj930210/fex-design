import { cn } from '@fex-design/utils'
import { input, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressValueClassName } from '@fex-design/components-styles/progress'
import { progressContext } from './progress-context'

@Component({
  selector: 'span[progressValue]',
  standalone: true,
  exportAs: 'progressValue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-value',
    '[attr.data-status]': 'root.status()',
  },
})
export class ProgressValue {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<HTMLSpanElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  protected readonly hostClassName = createHostClassName(() => cn(progressValueClassName, this.className()))
}
