import { createToggleController } from '@fex-design/core/toggle/create-toggle-controller'
import type { ToggleController, ToggleSnapshot } from '@fex-design/core/toggle/types'
import type {
  MessageActionAlign,
  MessageGroupSpacing,
  MessageLive,
  MessageSide,
  MessageTone,
} from '@fex-design/core/message/types'
import {
  messageActionClassName,
  messageActionsClassName,
  messageAvatarClassName,
  messageBodyClassName,
  messageClassName,
  messageContentClassName,
  messageFooterClassName,
  messageGroupClassName,
  messageHeaderClassName,
  messageStatusClassName,
} from '@fex-design/styles/message'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  HostListener,
  inject,
  input,
  output,
  type Signal,
} from '@angular/core'
import { createCoreStoreSignal } from '../../signals/core-store-signal'
import { createHostClassName } from '../../signals/host-class'
import { MESSAGE_SIDE_CONTEXT } from '../bubble/context'
import { MESSAGE_CONTEXT } from './context'
export
@Component({
  selector: 'fex-message',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MESSAGE_CONTEXT, useFactory: () => inject(Message) },
    { provide: MESSAGE_SIDE_CONTEXT, useFactory: () => inject(Message).side },
  ],
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'message',
    '[attr.data-side]': 'side()',
    '[attr.data-busy]': "busy()?'true':'false'",
    '[attr.aria-busy]': 'busy()',
  },
  template: '<ng-content />',
})
class Message {
  side = input<MessageSide>('start')
  busy = input(false, { transform: booleanAttribute })
  protected hostClassName = createHostClassName(() => messageClassName)
}
export
@Directive({
  selector: '[fexMessageAvatar]',
  standalone: true,
  host: { '[class]': 'hostClassName', 'data-slot': 'message-avatar' },
})
class MessageAvatar {
  protected hostClassName = messageAvatarClassName
}
export
@Directive({
  selector: '[fexMessageBody]',
  standalone: true,
  host: { '[class]': 'hostClassName', 'data-slot': 'message-body' },
})
class MessageBody {
  protected hostClassName = messageBodyClassName
}
export
@Directive({
  selector: '[fexMessageHeader]',
  standalone: true,
  host: { '[class]': 'hostClassName', 'data-slot': 'message-header' },
})
class MessageHeader {
  protected hostClassName = messageHeaderClassName
}
export
@Directive({
  selector: '[fexMessageContent]',
  standalone: true,
  host: { '[class]': 'hostClassName', 'data-slot': 'message-content' },
})
class MessageContent {
  protected hostClassName = messageContentClassName
}
export
@Directive({
  selector: '[fexMessageFooter]',
  standalone: true,
  host: { '[class]': 'hostClassName', 'data-slot': 'message-footer' },
})
class MessageFooter {
  protected hostClassName = messageFooterClassName
}
export
@Directive({
  selector: '[fexMessageStatus]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'message-status',
    '[attr.data-tone]': 'tone()',
    '[attr.role]': "live()==='off'?null:'status'",
    '[attr.aria-live]': "live()==='off'?null:live()",
  },
})
class MessageStatus {
  tone = input<MessageTone>('neutral')
  live = input<MessageLive>('polite')
  protected hostClassName = createHostClassName(() => messageStatusClassName({ tone: this.tone() }))
}
export
@Directive({
  selector: '[fexMessageActions]',
  standalone: true,
  host: {
    '[class]': 'hostClassName',
    'data-slot': 'message-actions',
    '[attr.data-align]': 'resolvedAlign()',
    '[attr.data-visibility]': 'visibility()',
  },
})
class MessageActions {
  private context = inject(MESSAGE_CONTEXT, { optional: true })
  align = input<MessageActionAlign>('inherit')
  visibility = input<'always' | 'interaction'>('always')
  protected resolvedAlign = computed(() =>
    this.align() === 'inherit' ? (this.context?.side() ?? 'start') : this.align(),
  )
  protected hostClassName = messageActionsClassName
}
export
@Directive({
  selector: '[fexMessageAction]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'message-action',
    '[attr.aria-pressed]': 'currentPressed()',
    '[attr.data-state]': "currentPressed()?'on':'off'",
    '[attr.data-disabled]': "disabled()?'true':null",
  },
})
class MessageAction {
  pressed = input<boolean | undefined>()
  defaultPressed = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })
  change = output<boolean>()
  private controller: ToggleController
  private snapshot: Signal<ToggleSnapshot>
  protected currentPressed = computed(() => this.pressed() ?? this.snapshot().pressed)
  protected hostClassName = createHostClassName(() => messageActionClassName())
  constructor() {
    const owner = this
    this.controller = createToggleController({
      get pressed() {
        return owner.pressed()
      },
      get defaultPressed() {
        return owner.defaultPressed()
      },
      get disabled() {
        return owner.disabled()
      },
      onChange(v) {
        owner.change.emit(v)
      },
    })
    this.snapshot = createCoreStoreSignal(this.controller)
  }
  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    if (e.defaultPrevented || this.disabled()) return
    this.controller.toggle()
  }
}
export
@Component({
  selector: 'fex-message-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'message-group',
    '[attr.data-spacing]': 'spacing()',
  },
  template: '<ng-content />',
})
class MessageGroup {
  spacing = input<MessageGroupSpacing>('default')
  protected hostClassName = createHostClassName(() =>
    messageGroupClassName({ spacing: this.spacing() }),
  )
}
