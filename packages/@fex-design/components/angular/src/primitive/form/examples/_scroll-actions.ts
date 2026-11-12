import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectFormActions } from '@fex-design/angular/primitive/form'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'div[formScrollActions]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  host: { class: 'contents' },
  template: `<div class="flex flex-wrap gap-3">
    <button button type="submit" variant="solid" color="primary">校验并定位首错</button
    ><button button type="button" (click)="actions.scrollToField('notes')">定位备注错误</button>
  </div>`,
})
export class ScrollActions {
  readonly actions = injectFormActions()
}
