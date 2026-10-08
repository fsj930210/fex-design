import type { UploadId } from '@fex-design/core/upload/types'
import { uploadItemClassName } from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { useUploadContext } from './upload-context'
import { UploadItemContext } from './upload-item-context'
import { useUploadItem } from './use-upload-item'

export function UploadItem<TResponse>({
  id,
  children,
  className,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  id: UploadId
  children?: ReactNode | ((state: ReturnType<typeof useUploadItem<TResponse>>) => ReactNode)
}) {
  const { upload } = useUploadContext<TResponse>()
  const state = useUploadItem(upload, id)
  if (!state.item) return null
  return (
    <UploadItemContext value={id}>
      <div
        {...props}
        role="listitem"
        className={cn(uploadItemClassName(), className)}
        data-status={state.item.status}
      >
        {typeof children === 'function' ? children(state) : children}
      </div>
    </UploadItemContext>
  )
}
