import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Card, CardContent, CardFooter, CardHeader } from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-primitive-styling-example',
  standalone: true,
  imports: [Card, CardHeader, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling.html',
})
export class StylingExample {}
