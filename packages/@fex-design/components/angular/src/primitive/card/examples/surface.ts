import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/angular/primitive/card'

@Component({
  selector: 'card-primitive-surface-example',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './surface.html',
})
export class SurfaceExample {}
