import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpinnerContainer } from '@fex-design/angular/ui/spinner'

@Component({ selector: 'spinner-styling-example', standalone: true, imports: [SpinnerContainer], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './styling.html' })
export class StylingExample {}
