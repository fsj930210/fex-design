import { aspectRatioClassName } from '@fex-design/styles/aspect-ratio'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import type { AspectRatioOptions } from '@fex-design/core/aspect-ratio/types'
@Component({
  selector: 'div[aspectRatio]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'aspect-ratio',
    '[style.aspect-ratio]': 'ratio()',
  },
  template: '<ng-content />',
})
export class AspectRatio {
  readonly ratio = input.required<AspectRatioOptions['ratio']>()
  protected readonly hostClassName = createHostClassName(() => aspectRatioClassName)
}
