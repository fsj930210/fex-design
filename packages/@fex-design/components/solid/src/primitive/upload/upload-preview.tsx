import { uploadPreviewClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useUploadContext, useUploadItemId } from './context'
import { createUploadPreview } from './create-upload'

export function UploadItemPreview(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const id = useUploadItemId()
  const { upload } = useUploadContext()
  const item = upload.getItem(id)
  const url = createUploadPreview(() => id)
  return (
    <div {...rest} class={cn(uploadPreviewClassName(), local.class)}>
      {local.children ??
        (url && item?.type?.startsWith('image/') ? (
          <img class="size-full object-cover" src={url} alt="" />
        ) : (
          <span aria-hidden="true">↥</span>
        ))}
    </div>
  )
}

export { UploadItemPreview as UploadPreview }
