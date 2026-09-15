import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Switch } from '@fex-design/angular/ui/switch'
@Component({
  selector: 'switch-semantic-styles-example',
  standalone: true,
  imports: [Switch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SwitchSemanticStylesExample {
  protected readonly classNames = { root: 'ring-2', content: 'font-semibold', thumb: 'shadow-lg' }
  protected readonly styles = {
    root: 'background-color:#0f766e;color:#fff;',
    content: 'letter-spacing:0.08em;',
    thumb: 'background-color:#ccfbf1;color:#0f766e;',
  }
}
