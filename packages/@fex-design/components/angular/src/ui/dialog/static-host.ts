import { NgTemplateOutlet } from '@angular/common'
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
import type { DialogStaticButtonProps, DialogStaticContent } from './dialog-service'
import { ChangeDetectionStrategy, Component, Input, signal, TemplateRef } from '@angular/core'
import type { OnDestroy } from '@angular/core'
import type { createDialogRequest } from '@fex-design/core/dialog/create-dialog-controller'
import { Dialog } from './dialog'
import { Button } from '../button'
type Request = ReturnType<typeof createDialogRequest<DialogStaticContent, DialogStaticButtonProps>>
@Component({
  selector: 'div[dialogStaticHost]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Dialog, Button, NgTemplateOutlet],
  template: `
    <div
      dialogUi
      [open]="state().open"
      [title]="state().options.title ?? (request.kind === 'alert' ? '提示' : '确认操作')"
      [closable]="(state().options.closable ?? request.kind === 'confirm') && !state().pending"
      [closeOnEscape]="false"
      [closeOnOverlayClick]="false"
      [classNames]="{ content: messageClassName }"
      [hasFooter]="true"
      (openChange)="onOpenChange($event)"
    >
      @if (contentTemplate; as template) {
        <ng-container [ngTemplateOutlet]="template" />
      } @else {
        <p>{{ contentText }}</p>
      }
      <p role="alert" class="text-danger">{{ state().error }}</p>
      <div dialogFooter class="flex items-center justify-end gap-2">
        @if (request.kind === 'confirm') {
          <button
            button
            type="button"
            [variant]="state().options.cancelBtnProps?.variant ?? 'outlined'"
            [color]="state().options.cancelBtnProps?.color"
            [size]="state().options.cancelBtnProps?.size ?? 'md'"
            [disabled]="state().pending || (state().options.cancelBtnProps?.disabled ?? false)"
            [loading]="state().options.cancelBtnProps?.loading ?? false"
            (click)="request.cancel()"
          >
            {{ state().options.cancelBtnProps?.content ?? '取消' }}
          </button>
        }
        <button
          button
          type="button"
          [variant]="state().options.okBtnProps?.variant ?? 'solid'"
          [color]="state().options.okBtnProps?.color ?? 'primary'"
          [size]="state().options.okBtnProps?.size ?? 'md'"
          [disabled]="state().pending || (state().options.okBtnProps?.disabled ?? false)"
          [loading]="state().pending || (state().options.okBtnProps?.loading ?? false)"
          (click)="request.confirm()"
        >
          {{ state().options.okBtnProps?.content ?? '确定' }}
        </button>
      </div>
    </div>
  `,
})
export class DialogStaticHost implements OnDestroy {
  readonly messageClassName = dialogMessageClassName
  readonly state = signal<ReturnType<Request['getSnapshot']>>({
    open: true,
    pending: false,
    error: '',
    options: { content: '' },
  })
  private unsubscribe?: () => void
  private current!: Request
  @Input({ required: true })
  set request(request: Request) {
    this.unsubscribe?.()
    this.current = request
    this.state.set(request.getSnapshot())
    this.unsubscribe = request.subscribe(() => this.state.set(request.getSnapshot()))
  }
  get request() {
    return this.current
  }
  get contentTemplate(): TemplateRef<unknown> | null {
    const content = this.state().options.content
    return content instanceof TemplateRef ? content : null
  }
  get contentText(): string {
    const content = this.state().options.content
    return typeof content === 'string' ? content : ''
  }
  onOpenChange(event: unknown) {
    const open = Array.isArray(event) ? event[0] : event
    if (!open) void this.request.cancel()
  }
  ngOnDestroy() {
    this.unsubscribe?.()
  }
}
