import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/angular/primitive/select'
import { Card } from '@fex-design/angular/ui/card'
import { frameworkOptions } from './data'
export
@Component({
  selector: 'select-custom-render-demo',
  standalone: true,
  imports: [Card, SelectRoot, SelectTrigger, SelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-render-demo.component.html',
})
class CustomRenderDemo {
  protected readonly options = frameworkOptions
}
