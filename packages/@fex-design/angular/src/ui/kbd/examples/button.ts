import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Kbd } from '../kbd'
@Component({ selector: 'kbd-ui-button-example', standalone: true, imports: [Button, Kbd], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './button.html' })
export class ButtonExample {}
