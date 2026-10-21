import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { tagActionClassName } from '@fex-design/components-styles/tag'
import { XIcon } from '@fex-design/angular/icons/x'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'button[tagAction]',
  standalone: true,
  imports: [XIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.aria-label]': 'ariaLabel()',
    'data-slot': 'tag-action',
    type: 'button',
  },
  templateUrl: './tag-action.html',
})
export class TagAction {
  readonly class = input<string>()
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' })
  protected readonly hostClassName = createHostClassName(tagActionClassName, () => this.class())
}
