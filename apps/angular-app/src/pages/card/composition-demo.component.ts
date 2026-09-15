import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-composition-demo',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent],
  templateUrl: './composition-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCompositionDemo {}
