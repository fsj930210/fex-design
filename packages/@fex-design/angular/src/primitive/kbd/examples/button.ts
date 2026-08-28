import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { Kbd } from '../kbd'

@Component({ selector: 'kbd-button-example', standalone: true, imports: [Button, Kbd], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './button.html' })
export class ButtonExample {}
