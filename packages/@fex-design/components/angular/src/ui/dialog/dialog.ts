import { ChangeDetectionStrategy, Component, Directive, HostListener, ViewChild, inject, input, output } from '@angular/core'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogFullscreenToggle,
} from '../../primitive/dialog'
import { Button } from '../button'

@Component({
  selector: '[dialogUi]',
  standalone: true,
  imports: [DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #dialogRoot dialog [open]="open()" [defaultOpen]="defaultOpen()" [fullscreen]="fullscreen()" (openChange)="openChange.emit($event)">
      <ng-content select="[dialogTrigger]"></ng-content>
      <div dialogPortal>
        <div dialogOverlay></div>
        <div dialogContent [style]="contentStyle()">
          <div dialogHeader>
            <h2 dialogTitle>{{ title() }}</h2>
            <ng-content select="[dialogHeaderContent]"></ng-content>
            @if (fullscreen()) { <button dialogFullscreenToggle></button> }
            @if (closable()) { <button dialogClose iconOnly></button> }
          </div>
          <div dialogBody><ng-content></ng-content></div>
          @if (footer() !== null) {
            <div dialogFooter>
              <ng-content select="[dialogFooter]"></ng-content>
              @if (!hasFooter()) {
                <button dialogClose>{{ cancelText() }}</button>
                <button button variant="solid" color="primary">{{ okText() }}</button>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class Dialog {
  @ViewChild('dialogRoot', { read: DialogRoot }) private root?: DialogRoot
  readonly open = input<boolean | undefined>()
  readonly defaultOpen = input(false)
  readonly title = input('')
  readonly closable = input(true)
  readonly fullscreen = input<boolean | { mode?: 'viewport' | 'screen' } | undefined>()
  readonly footer = input<unknown>(undefined)
  readonly cancelText = input('取消')
  readonly okText = input('确定')
  readonly openChange = output<unknown>()
  readonly hasFooter = input(false)
  readonly contentStyle = input<string | Record<string, string>>()

  toggle(event: MouseEvent) {
    this.root?.dialog.toggle({ reason: 'trigger-click', event })
  }
}

@Directive({
  selector: 'button[dialogTrigger]',
  standalone: true,
  host: {
    type: 'button',
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.data-slot]': "'dialog-trigger'",
  },
})
export class DialogTrigger {
  private readonly dialog = inject(Dialog)

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    this.dialog.toggle(event)
  }
}

