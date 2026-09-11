import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Spinner } from '@fex-design/angular/primitive/spinner'
import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-loading-example', standalone: true, imports: [SwitchRoot, SwitchThumb, Spinner], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './loading.html' })
export class SwitchLoadingExample {
  
}
