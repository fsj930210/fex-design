import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Card, CardContent, CardFooter, CardHeader } from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-semantic-styles-example',
  standalone: true,
  imports: [Card, CardHeader, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class CardSemanticStylesExample {}
