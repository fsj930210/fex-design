import { Component } from '@angular/core'
import { Badge, BadgeDot } from '@fex-design/angular/primitive/badge'

@Component({
  selector: 'badge-primitive-css-variables-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  templateUrl: './css-variables.html',
})
export class CssVariables {}
