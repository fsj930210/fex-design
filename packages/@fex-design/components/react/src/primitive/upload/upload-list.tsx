import type { UploadItem as UploadItemValue } from '@fex-design/core/upload/types'
import { uploadListClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import { useSyncExternalStore, type HTMLAttributes, type ReactNode } from 'react'
import { useUploadContext } from './upload-context'

export function UploadList<TResponse>({
  children,
  className,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: (items: readonly UploadItemValue<TResponse>[]) => ReactNode
}) {
  const { upload, listId } = useUploadContext<TResponse>()
  const items = useSyncExternalStore(upload.subscribeItems, upload.getItems, upload.getItems)
  if (!items.length) return null
  return (
    <div {...props} id={listId} role="list" className={cn(uploadListClassName(), className)}>
      {children(items)}
    </div>
  )
}
