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
  selector: 'card-primitive-css-variables-example',
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class CssVariablesExample {}
