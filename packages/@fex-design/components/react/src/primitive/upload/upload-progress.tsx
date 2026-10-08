import {
  uploadProgressClassName,
  uploadProgressIndicatorClassName,
} from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useUploadContext } from './upload-context'
import { useUploadItemId } from './upload-item-context'
import { useUploadItem } from './use-upload-item'

export function UploadItemProgress({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const id = useUploadItemId()
  const { upload } = useUploadContext()
  const item = useUploadItem(upload, id).item
  const percent = item?.progress?.percent ?? 0
  return (
    <div
      {...props}
      className={cn(uploadProgressClassName(), className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <div className={uploadProgressIndicatorClassName()} style={{ width: `${percent}%` }} />
    </div>
  )
}

export { UploadItemProgress as UploadProgress }
