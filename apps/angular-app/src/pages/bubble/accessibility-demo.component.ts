import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Bubble,
  BubbleContent,
  BubbleReaction,
  BubbleReactions,
  BubbleReactionCount,
} from '@fex-design/angular/primitive/bubble'
import Card from '@fex-design/angular/ui/card'
export
@Component({
  selector: 'fex-bubble-accessibility-demo',
  standalone: true,
  imports: [Card, Bubble, BubbleContent, BubbleReactions, BubbleReaction, BubbleReactionCount],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibility-demo.component.html',
})
class BubbleAccessibilityDemoComponent {}
