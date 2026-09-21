import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-primitive-basic-example',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
