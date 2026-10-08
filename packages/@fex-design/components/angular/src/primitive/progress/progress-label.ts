import { cn } from '@fex-design/utils'
import { input, Directive, ElementRef, inject } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressLabelClassName } from '@fex-design/components-styles/progress'

@Directive({
  selector: 'span[progressLabel]',
  standalone: true,
  exportAs: 'progressLabel',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-label',
  },
})
export class ProgressLabel {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<HTMLSpanElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(() => cn(progressLabelClassName, this.className()))
}
