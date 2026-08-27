import { ChangeDetectionStrategy, Component, input, type TemplateRef } from '@angular/core'
import type { SpinnerClassNames, SpinnerSize, SpinnerStyles } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName, spinnerOverlayClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import { Spinner, SpinnerText } from '../../primitive/spinner/spinner'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'div[spinnerContainer]',
  standalone: true,
  imports: [Spinner, SpinnerText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', '[style]': 'styles().root', '[attr.aria-busy]': 'spinning() ?? null', 'data-slot': 'spinner-container' },
  templateUrl: './spinner.html',
})
export class SpinnerContainer {
  readonly spinning = input<boolean | undefined>()
  readonly size = input<SpinnerSize>('md')
  readonly text = input<string | undefined>()
  readonly indicator = input<TemplateRef<unknown> | undefined>()
  readonly classNames = input<SpinnerClassNames>({})
  readonly styles = input<SpinnerStyles<string>>({})
  protected readonly hostClassName = createHostClassName(() => cn(spinnerContainerClassName, this.classNames().root))
  protected readonly overlayClassName = () => cn(spinnerOverlayClassName, this.classNames().overlay, this.text() && 'flex-col')
}

export { Spinner }
