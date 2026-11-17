import { createStore } from '../store/create-store'

export interface DialogRequestOptions<TContent = string, TButtonProps = Record<string, never>> {
  title?: TContent
  content: TContent
  closable?: boolean
  okBtnProps?: TButtonProps
  cancelBtnProps?: TButtonProps
  onOk?: () => void | boolean | Promise<void | boolean>
  onCancel?: () => void | boolean | Promise<void | boolean>
}

export interface DialogRequestHandle<TOptions = DialogRequestOptions<unknown, unknown>> {
  result: Promise<boolean>
  close: () => void
  destroy: () => void
  update: (patch: Partial<TOptions> | ((previous: Readonly<TOptions>) => Partial<TOptions>)) => void
}

const activeRequests = new Set<() => void>()

export function destroyAllDialogRequests() {
  for (const destroy of [...activeRequests]) destroy()
}

export function createDialogRequest<TContent, TButtonProps = Record<string, never>>(
  kind: 'alert' | 'confirm',
  options: DialogRequestOptions<TContent, TButtonProps>,
) {
  type Options = DialogRequestOptions<TContent, TButtonProps>
  const store = createStore({ open: true, pending: false, error: '', options: { ...options } })
  let settled = false
  let resolveResult!: (confirmed: boolean) => void
  const result = new Promise<boolean>((resolve) => {
    resolveResult = resolve
  })

  function close(confirmed = false) {
    if (settled) return
    settled = true
    activeRequests.delete(destroy)
    store.setSnapshot({ ...store.getSnapshot(), open: false, pending: false, error: '' })
    resolveResult(confirmed)
  }

  function destroy() {
    close(false)
  }

  function update(patch: Partial<Options> | ((previous: Readonly<Options>) => Partial<Options>)) {
    if (settled) return
    const snapshot = store.getSnapshot()
    const next = typeof patch === 'function' ? patch(snapshot.options) : patch
    // An updater may itself destroy this request; it must not reopen a settled instance.
    if (settled) return
    store.setSnapshot({ ...store.getSnapshot(), options: { ...snapshot.options, ...next } })
  }

  activeRequests.add(destroy)

  async function act(confirmed: boolean) {
    if (settled || store.getSnapshot().pending) return
    store.setSnapshot({ ...store.getSnapshot(), open: true, pending: true, error: '' })
    try {
      const current = store.getSnapshot().options
      const accepted = await (confirmed ? current.onOk?.() : current.onCancel?.())
      if (settled) return
      if (accepted === false)
        store.setSnapshot({ ...store.getSnapshot(), open: true, pending: false, error: '' })
      else close(confirmed)
    } catch (error) {
      if (!settled)
        store.setSnapshot({
          ...store.getSnapshot(),
          open: true,
          pending: false,
          error: error instanceof Error ? error.message : '操作失败，请重试',
        })
    }
  }

  return {
    kind,
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    confirm: () => act(true),
    cancel: () => act(false),
    handle: { result, close: destroy, destroy, update } satisfies DialogRequestHandle<Options>,
  }
}
