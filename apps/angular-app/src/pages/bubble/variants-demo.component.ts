import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Bubble, BubbleContent } from '@fex-design/angular/primitive/bubble'
import Card from '@fex-design/angular/ui/card'
export
@Component({
  selector: 'fex-bubble-variants-demo',
  standalone: true,
  imports: [Card, Bubble, BubbleContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './variants-demo.component.html',
})
class BubbleVariantsDemoComponent {}
