import type { ButtonProps } from '../button'
import { createApp, type VNodeChild } from 'vue'
import {
  createDialogRequest,
  type DialogRequestOptions,
  type DialogRequestHandle as CoreDialogRequestHandle,
} from '@fex-design/core/dialog/create-dialog-controller'
import Host from './static-host.vue'
export type DialogStaticButtonProps = Omit<ButtonProps, 'onClick' | 'type' | 'hidden'> & {
  content?: string
}
export type DialogStaticContent = VNodeChild | (() => VNodeChild)
export type DialogStaticOptions = DialogRequestOptions<DialogStaticContent, DialogStaticButtonProps>
export type DialogRequestHandle = CoreDialogRequestHandle<DialogStaticOptions>

function show(kind: 'alert' | 'confirm', options: DialogStaticOptions): DialogRequestHandle {
  if (typeof document === 'undefined') throw new Error('Dialog static methods require a browser')
  const request = createDialogRequest(kind, options)
  const container = document.createElement('div')
  document.body.append(container)
  const app = createApp(Host, { request })
  app.mount(container)
  const unsubscribe = request.subscribe(() => {
    if (request.getSnapshot().open) return
    unsubscribe()
    // Unmount after the Dialog closing presence phase.
    setTimeout(() => {
      app.unmount()
      container.remove()
    }, 240)
  })
  return request.handle
}
export function alert(options: DialogStaticOptions = { content: '' }) {
  return show('alert', options)
}
export function confirm(options: DialogStaticOptions = { content: '' }) {
  return show('confirm', options)
}

export { destroyAllDialogRequests as destroyAll } from '@fex-design/core/dialog/create-dialog-controller'
