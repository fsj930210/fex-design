import type { UploadId } from '@fex-design/core/upload/types'
import { uploadItemClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import {
  Show,
  splitProps,
  type JSX,
} from 'solid-js'
import { UploadItemContext, useUploadContext } from './context'
import { createUploadItem } from './create-upload'

export function UploadItem<TResponse>(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    id: UploadId
    children?:
      | JSX.Element
      | ((state: ReturnType<typeof createUploadItem<TResponse>>) => JSX.Element)
  },
) {
  const [local, rest] = splitProps(props, ['id', 'class', 'children'])
  const { upload } = useUploadContext<TResponse>()
  const state = createUploadItem(upload, () => local.id)
  return (
    <Show when={state.item()}>
      <UploadItemContext.Provider value={local.id}>
        <div
          {...rest}
          role="listitem"
          class={cn(uploadItemClassName(), local.class)}
          data-status={state.item()?.status}
        >
          {typeof local.children === 'function' ? local.children(state) : local.children}
        </div>
      </UploadItemContext.Provider>
    </Show>
  )
}
