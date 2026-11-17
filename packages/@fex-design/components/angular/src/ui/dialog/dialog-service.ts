import type { ButtonColor, ButtonSize, ButtonVariant } from '@fex-design/core/button/types'
import {
  ApplicationRef,
  EnvironmentInjector,
  DestroyRef,
  Injectable,
  TemplateRef,
  createComponent,
  inject,
} from '@angular/core'
import {
  createDialogRequest,
  destroyAllDialogRequests,
  type DialogRequestOptions,
  type DialogRequestHandle as CoreDialogRequestHandle,
} from '@fex-design/core/dialog/create-dialog-controller'
import { DialogStaticHost } from './static-host'
export interface DialogStaticButtonProps {
  content?: string
  disabled?: boolean
  loading?: boolean
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
}
export type DialogStaticContent = string | TemplateRef<unknown>
export type DialogStaticOptions = DialogRequestOptions<DialogStaticContent, DialogStaticButtonProps>
export type DialogRequestHandle = CoreDialogRequestHandle<DialogStaticOptions>
@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly application = inject(ApplicationRef)
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly destroyRef = inject(DestroyRef)
  private readonly active = new Set<() => void>()
  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const dispose of [...this.active]) dispose()
    })
  }
  alert(options: DialogStaticOptions = { content: '' }): DialogRequestHandle {
    return this.show('alert', options)
  }
  confirm(options: DialogStaticOptions = { content: '' }): DialogRequestHandle {
    return this.show('confirm', options)
  }
  destroyAll(): void {
    destroyAllDialogRequests()
  }
  private show(kind: 'alert' | 'confirm', options: DialogStaticOptions): DialogRequestHandle {
    if (typeof document === 'undefined') throw new Error('Dialog static methods require a browser')
    const request = createDialogRequest(kind, options)
    const container = document.createElement('div')
    document.body.append(container)
    const component = createComponent(DialogStaticHost, {
      hostElement: container,
      environmentInjector: this.environmentInjector,
    })
    component.setInput('request', request)
    this.application.attachView(component.hostView)
    component.changeDetectorRef.detectChanges()
    let timer: ReturnType<typeof setTimeout> | undefined
    const dispose = () => {
      unsubscribe()
      if (timer !== undefined) clearTimeout(timer)
      this.active.delete(dispose)
      request.handle.close()
      this.application.detachView(component.hostView)
      component.destroy()
      container.remove()
    }
    const unsubscribe = request.subscribe(() => {
      if (request.getSnapshot().open) return
      unsubscribe()
      // Retain the view until the Dialog closing presence phase completes.
      timer = setTimeout(dispose, 240)
    })
    this.active.add(dispose)
    return request.handle
  }
}
