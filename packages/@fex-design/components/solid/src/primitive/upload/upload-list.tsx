import type { UploadItem as UploadItemValue } from '@fex-design/core/upload/types'
import { uploadListClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import {
  createSignal,
  onCleanup,
  Show,
  splitProps,
  type JSX,
} from 'solid-js'
import { useUploadContext } from './context'

export function UploadList<TResponse>(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children(items: readonly UploadItemValue<TResponse>[]): JSX.Element
  },
) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const { upload, listId } = useUploadContext<TResponse>()
  const [items, setItems] = createSignal(upload.getItems())
  const unsubscribe = upload.subscribeItems(() => setItems(() => upload.getItems()))
  onCleanup(unsubscribe)
  return (
    <Show when={items().length}>
      <div {...rest} id={listId} role="list" class={cn(uploadListClassName(), local.class)}>
        {local.children(items())}
      </div>
    </Show>
  )
}
