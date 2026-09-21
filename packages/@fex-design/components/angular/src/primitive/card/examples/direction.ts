import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/angular/primitive/card'
@Component({
  selector: 'card-primitive-direction-example',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {
  protected readonly directions = ['ltr', 'rtl']
}
