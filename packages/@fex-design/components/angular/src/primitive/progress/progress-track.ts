import { cn } from '@fex-design/utils'
import { input, Directive, ElementRef, inject } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { progressLineClassName } from '@fex-design/components-styles/progress'
import { progressContext } from './progress-context'

@Directive({
  selector: 'div[progressTrack]',
  standalone: true,
  exportAs: 'progressTrack',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'progress-track',
    '[attr.data-status]': 'root.status()',
    '[style.height.px]': 'root.thickness()',
  },
})
export class ProgressTrack {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly root = inject(progressContext)
  protected readonly hostClassName = createHostClassName(() => cn(progressLineClassName, this.className()))
}
