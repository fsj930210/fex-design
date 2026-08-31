import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardHeader,
  CardTitle,
} from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-primitive-custom-header-example',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-header.html',
})
export class CustomHeaderExample {}
