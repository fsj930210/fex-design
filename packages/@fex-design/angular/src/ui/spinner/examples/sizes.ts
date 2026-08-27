import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Spinner } from '@fex-design/angular/ui/spinner'

@Component({ selector: 'spinner-sizes-example', standalone: true, imports: [Spinner], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './sizes.html' })
export class SizesExample {}
