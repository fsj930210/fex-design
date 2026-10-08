import type { DropFeatureApi } from '@fex-design/core/upload/features/drop'
import type { PasteFeatureApi } from '@fex-design/core/upload/features/paste'
import { getDroppedFiles } from '@fex-design/core/upload/get-dropped-files'
import { uploadDropzoneClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useUploadContext } from './upload-context'
import { useUploadDragging } from './use-upload-feature'

export function UploadDropzone({
  className,
  children,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onPaste,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { upload, invalid } = useUploadContext()
  const drop = upload.getFeature<DropFeatureApi>('drop')
  const paste = upload.getFeature<PasteFeatureApi>('paste')
  const dragging = useUploadDragging()
  const disabled = upload.getOptions().disabled
  return (
    <div
      {...props}
      className={cn(uploadDropzoneClassName(), className)}
      role="button"
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled}
      aria-invalid={invalid}
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      onDragEnter={(event) => {
        onDragEnter?.(event)
        if (!event.defaultPrevented && drop) {
          event.preventDefault()
          drop.dragEnter()
        }
      }}
      onDragOver={(event) => {
        onDragOver?.(event)
        if (!event.defaultPrevented && drop) event.preventDefault()
      }}
      onDragLeave={(event) => {
        onDragLeave?.(event)
        if (!event.defaultPrevented) drop?.dragLeave()
      }}
      onDrop={(event) => {
        onDrop?.(event)
        if (!event.defaultPrevented && drop) {
          event.preventDefault()
          void getDroppedFiles(event.dataTransfer).then((files) => drop.drop(files))
        }
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (!event.defaultPrevented && paste) {
          const files = [...event.clipboardData.files]
          if (files.length) {
            event.preventDefault()
            void paste.paste(files)
          }
        }
      }}
    >
      {children}
    </div>
  )
}
