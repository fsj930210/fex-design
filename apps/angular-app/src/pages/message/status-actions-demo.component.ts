import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Bubble, BubbleContent } from '@fex-design/angular/primitive/bubble'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageBody,
  MessageContent,
  MessageFooter,
  MessageStatus,
} from '@fex-design/angular/primitive/message'
import Card from '@fex-design/angular/ui/card'
export
@Component({
  selector: 'fex-message-status-actions-demo',
  standalone: true,
  imports: [
    Card,
    Bubble,
    BubbleContent,
    Message,
    MessageBody,
    MessageContent,
    MessageStatus,
    MessageFooter,
    MessageActions,
    MessageAction,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-actions-demo.component.html',
})
class MessageStatusActionsDemoComponent {
  readonly saved = signal(false)
}
