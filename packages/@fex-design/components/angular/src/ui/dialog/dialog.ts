import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostListener,
  computed,
  ViewChild,
  TemplateRef,
  inject,
  input,
  output,
} from '@angular/core'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
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
  imports: [
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
    DialogFullscreenToggle,
    Button,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #dialogRoot
      dialog
      [modal]="modal()"
      [open]="open()"
      [defaultOpen]="defaultOpen()"
      [forceMount]="forceMount()"
      [closeDelay]="closeDelay()"
      [closeOnEscape]="closeOnEscape()"
      [fullscreen]="fullscreen()"
      [closeOnOverlayClick]="closeOnOverlayClick()"
      (openChange)="openChange.emit($event)"
    >
      <ng-content select="[dialogTrigger]"></ng-content>
      <div dialogPortal>
        @if (overlay()) {
          <div dialogOverlay></div>
        }
        <div dialogContent [style]="contentStyle()" [class]="classNames().content ?? ''">
          <div dialogHeader [class]="classNames().header ?? ''">
            <h2 dialogTitle [class]="classNames().title ?? ''">
              @if (titleTemplate(); as template) {
                <ng-container [ngTemplateOutlet]="template" />
              } @else {
                {{ titleText() }}
              }
            </h2>
            <ng-content select="[dialogHeaderContent]"></ng-content>
          </div>
          <div dialogActions>
            <ng-content select="[dialogActionsContent]"></ng-content>
            @if (fullscreen()) {
              <button dialogFullscreenToggle></button>
            }
            @if (closable() !== false && closeOptions()?.icon !== null) {
              <button
                dialogClose
                iconOnly
                [disabled]="closeOptions()?.disabled ?? false"
                (click)="closeOptions()?.onClose?.($event)"
              >
                @if (closeOptions()?.icon; as icon) {
                  <ng-container [ngTemplateOutlet]="icon" />
                }
              </button>
            }
          </div>
          <div dialogBody [class]="classNames().body ?? ''"><ng-content></ng-content></div>
          @if (footer() !== null) {
            <div dialogFooter [class]="classNames().footer ?? ''">
              <ng-content select="[dialogFooter]"></ng-content>
              @if (!hasFooter()) {
                <button
                  dialogClose
                  [disabled]="cancelBtnProps().disabled ?? false"
                  (click)="cancelBtnProps().onClick?.($event)"
                >
                  {{ cancelBtnProps().content ?? '取消' }}
                </button>
                <button
                  button
                  variant="solid"
                  color="primary"
                  [disabled]="okBtnProps().disabled ?? false"
                  (click)="okBtnProps().onClick?.($event)"
                >
                  {{ okBtnProps().content ?? '确定' }}
                </button>
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
  readonly modal = input(true)
  readonly defaultOpen = input(false)
  readonly forceMount = input(false)
  readonly closeDelay = input(200)
  readonly closeOnEscape = input(true)
  readonly title = input<string | TemplateRef<unknown>>('')
  readonly titleTemplate = computed(() => {
    const value = this.title()
    return value instanceof TemplateRef ? value : null
  })
  readonly titleText = computed(() => {
    const value = this.title()
    return typeof value === 'string' ? value : ''
  })
  readonly closable = input<
    | boolean
    | {
        icon?: TemplateRef<unknown> | null
        disabled?: boolean
        onClose?: (event: MouseEvent) => void
      }
  >(true)
  readonly closeOptions = computed(() => {
    const value = this.closable()
    return typeof value === 'object' ? value : undefined
  })
  readonly overlay = input(true)
  readonly closeOnOverlayClick = input(true)
  readonly fullscreen = input<boolean | { mode?: 'viewport' | 'screen' } | undefined>()
  readonly footer = input<unknown>(undefined)
  readonly cancelBtnProps = input<{
    content?: string
    disabled?: boolean
    onClick?: (event: MouseEvent) => void
  }>({})
  readonly okBtnProps = input<{
    content?: string
    disabled?: boolean
    onClick?: (event: MouseEvent) => void
  }>({})
  readonly openChange = output<unknown>()
  readonly classNames = input<
    Partial<Record<'content' | 'header' | 'title' | 'body' | 'footer', string>>
  >({})
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
