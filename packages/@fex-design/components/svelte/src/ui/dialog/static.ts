import type { ButtonProps } from '../button'
import { mount, unmount, type Snippet } from 'svelte'
import {
  createDialogRequest,
  type DialogRequestOptions,
  type DialogRequestHandle as CoreDialogRequestHandle,
} from '@fex-design/core/dialog/create-dialog-controller'
import Host from './static-host.svelte'
export type DialogStaticButtonProps = Omit<ButtonProps, 'onclick' | 'type' | 'hidden'>
export type DialogStaticContent = string | Snippet
export type DialogStaticOptions = DialogRequestOptions<DialogStaticContent, DialogStaticButtonProps>
export type DialogRequestHandle = CoreDialogRequestHandle<DialogStaticOptions>

function show(kind: 'alert' | 'confirm', options: DialogStaticOptions): DialogRequestHandle {
  if (typeof document === 'undefined') throw new Error('Dialog static methods require a browser')
  const request = createDialogRequest(kind, options)
  const container = document.createElement('div')
  document.body.append(container)
  const instance = mount(Host, { target: container, props: { request } })
  const unsubscribe = request.subscribe(() => {
    if (request.getSnapshot().open) return
    unsubscribe()
    // Retain the component for the Dialog closing presence phase.
    setTimeout(() => {
      void unmount(instance)
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
