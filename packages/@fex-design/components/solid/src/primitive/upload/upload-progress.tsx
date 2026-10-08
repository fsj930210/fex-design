import {
  uploadProgressClassName,
  uploadProgressIndicatorClassName,
} from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useUploadContext, useUploadItemId } from './context'
import { createUploadItem } from './create-upload'

export function UploadItemProgress(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  const id = useUploadItemId()
  const { upload } = useUploadContext()
  const item = createUploadItem(upload, () => id).item
  const percent = () => item()?.progress?.percent ?? 0
  return (
    <div
      {...rest}
      class={cn(uploadProgressClassName(), local.class)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent())}
    >
      <div class={uploadProgressIndicatorClassName()} style={{ width: `${percent()}%` }} />
    </div>
  )
}

export { UploadItemProgress as UploadProgress }
