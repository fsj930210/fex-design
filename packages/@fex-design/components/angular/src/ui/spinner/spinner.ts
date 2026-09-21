import { ChangeDetectionStrategy, Component, input, type TemplateRef } from '@angular/core'
import type { SpinnerClassNames, SpinnerSize, SpinnerStyles } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName } from '@fex-design/components-styles/spinner'
import { cn } from '@fex-design/utils'
import { Spinner, SpinnerOverlay, SpinnerText } from '@fex-design/angular/primitive/spinner'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[spinnerContainer]',
  standalone: true,
  imports: [Spinner, SpinnerOverlay, SpinnerText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style]': 'styles().root',
    '[attr.aria-busy]': 'spinning() ?? null',
    'data-slot': 'spinner-container',
  },
  templateUrl: './spinner.html',
})
export class SpinnerContainer {
  readonly spinning = input<boolean | undefined>()
  readonly size = input<SpinnerSize>('md')
  readonly text = input<string | undefined>()
  readonly indicator = input<TemplateRef<unknown> | undefined>()
  readonly classNames = input<SpinnerClassNames>({})
  readonly styles = input<SpinnerStyles<string>>({})
  protected readonly hostClassName = createHostClassName(() =>
    cn(spinnerContainerClassName, this.classNames().root),
  )
  protected readonly overlayClassName = () =>
    cn(this.classNames().overlay, this.text() && 'flex-col')
}

export { Spinner }
