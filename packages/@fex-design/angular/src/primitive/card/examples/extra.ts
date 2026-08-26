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
  selector: 'card-primitive-extra-example',
  standalone: true,
  imports: [Card, CardContent, CardDescription, CardExtra, CardHeader, CardTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './extra.html',
})
export class ExtraExample {}
