import type { DropFeatureApi } from '@fex-design/core/upload/features/drop'
import type { PasteFeatureApi } from '@fex-design/core/upload/features/paste'
import { getDroppedFiles } from '@fex-design/core/upload/get-dropped-files'
import { uploadDropzoneClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import {
  createSignal,
  onCleanup,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { useUploadContext } from './context'

export function UploadDropzone(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'onDragEnter',
    'onDragLeave',
    'onDragOver',
    'onDrop',
    'onPaste',
  ])
  const { upload, invalid } = useUploadContext()
  const drop = upload.getFeature<DropFeatureApi>('drop')
  const paste = upload.getFeature<PasteFeatureApi>('paste')
  const [dragging, setDragging] = createSignal(drop?.getDragging() ?? false)
  const unsubscribe = drop?.subscribe(() => setDragging(drop.getDragging()))
  onCleanup(() => unsubscribe?.())
  return (
    <div
      {...rest}
      class={cn(uploadDropzoneClassName(), local.class)}
      role="button"
      tabIndex={upload.getOptions().disabled ? undefined : 0}
      aria-disabled={upload.getOptions().disabled}
      aria-invalid={invalid()}
      data-dragging={dragging() || undefined}
      data-disabled={upload.getOptions().disabled || undefined}
      data-invalid={invalid() || undefined}
      onDragEnter={(event) => {
        if (drop) event.preventDefault()
        drop?.dragEnter()
      }}
      onDragOver={(event) => {
        if (drop) event.preventDefault()
      }}
      onDragLeave={() => drop?.dragLeave()}
      onDrop={(event) => {
        if (!drop || !event.dataTransfer) return
        event.preventDefault()
        void getDroppedFiles(event.dataTransfer).then((files) => drop.drop(files))
      }}
      onPaste={(event) => {
        const files = [...(event.clipboardData?.files ?? [])]
        if (paste && files.length) {
          event.preventDefault()
          void paste.paste(files)
        }
      }}
    >
      {local.children}
    </div>
  )
}
