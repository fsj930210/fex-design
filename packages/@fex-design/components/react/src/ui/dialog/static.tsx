import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
import type { ReactNode, ComponentProps } from 'react'
import { useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createDialogRequest,
  type DialogRequestOptions,
  type DialogRequestHandle as CoreDialogRequestHandle,
} from '@fex-design/core/dialog/create-dialog-controller'
import { Dialog } from './index'
import { Button } from '../button'

export type DialogStaticOptions = DialogRequestOptions<
  ReactNode,
  Omit<ComponentProps<typeof Button>, 'onClick' | 'type' | 'hidden'>
>

export type DialogRequestHandle = CoreDialogRequestHandle<DialogStaticOptions>

function show(kind: 'alert' | 'confirm', options: DialogStaticOptions): DialogRequestHandle {
  if (typeof document === 'undefined') throw new Error('Dialog static methods require a browser')
  const request = createDialogRequest(kind, options)
  const container = document.createElement('div')
  document.body.append(container)
  function Host() {
    const state = useSyncExternalStore(request.subscribe, request.getSnapshot)
    return (
      <Dialog
        open={state.open}
        title={state.options.title ?? (kind === 'alert' ? '提示' : '确认操作')}
        closable={(state.options.closable ?? kind === 'confirm') && !state.pending}
        closeOnEscape={false}
        closeOnOverlayClick={false}
        onOpenChange={(open) => {
          if (!open) void request.cancel()
        }}
        classNames={{ content: dialogMessageClassName }}
        footer={
          <>
            {kind === 'confirm' && (
              <Button
                {...state.options.cancelBtnProps}
                type="button"
                disabled={state.pending || state.options.cancelBtnProps?.disabled}
                onClick={() => void request.cancel()}
              >
                {state.options.cancelBtnProps?.children ?? '取消'}
              </Button>
            )}
            <Button
              variant="solid"
              color="primary"
              {...state.options.okBtnProps}
              type="button"
              disabled={state.pending || state.options.okBtnProps?.disabled}
              loading={state.pending || state.options.okBtnProps?.loading}
              onClick={() => void request.confirm()}
            >
              {state.options.okBtnProps?.children ?? '确定'}
            </Button>
          </>
        }
      >
        {state.options.content}
        <p role="alert" className="text-danger">
          {state.error}
        </p>
      </Dialog>
    )
  }
  const root = createRoot(container)
  root.render(<Host />)
  const unsubscribe = request.subscribe(() => {
    if (request.getSnapshot().open) return
    unsubscribe()
    // Keep the host until Dialog finishes its closing presence phase.
    setTimeout(() => {
      root.unmount()
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
