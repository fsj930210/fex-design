import { uploadPreviewClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useUploadContext } from './upload-context'
import { useUploadItemId } from './upload-item-context'
import { useUploadPreview } from './use-upload-feature'

export function UploadItemPreview({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const id = useUploadItemId()
  const { upload } = useUploadContext()
  const item = upload.getItem(id)
  const url = useUploadPreview(id)
  return (
    <div {...props} className={cn(uploadPreviewClassName(), className)}>
      {children ??
        (url && item?.type?.startsWith('image/') ? (
          <img className="size-full object-cover" src={url} alt="" />
        ) : (
          <span aria-hidden>↥</span>
        ))}
    </div>
  )
}

export { UploadItemPreview as UploadPreview }
