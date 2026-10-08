import type {
  UploadController,
  UploadOptions,
} from '@fex-design/core/upload/types'
import {
  uploadRootClassName,
} from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import {
  useId,
  useRef,
  type HTMLAttributes,
} from 'react'
import useUnmount from '@fex-design/react/hooks/use-unmount'
import { UploadContext } from './upload-context'
import { useUploadController } from './use-upload'

export interface UploadRootProps<TResponse> extends HTMLAttributes<HTMLDivElement> {
  controller?: UploadController<TResponse>
  options?: UploadOptions<TResponse>
  invalid?: boolean
  name?: string
  required?: boolean
}

export function UploadRoot<TResponse>({
  controller: supplied,
  options,
  invalid = false,
  name,
  required,
  className,
  children,
  ...props
}: UploadRootProps<TResponse>) {
  const upload = useUploadController(options, supplied)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const listId = useId()
  useUnmount(() => {
    if (!supplied) upload.destroy()
  })
  const currentOptions = upload.getOptions()
  const directory = upload.hasFeature('directory')
  return (
    <UploadContext value={{ upload, inputRef, inputId, listId, invalid }}>
      <div
        {...props}
        className={cn(uploadRootClassName(), className)}
        data-disabled={currentOptions.disabled || undefined}
        data-invalid={invalid || undefined}
      >
        {children}
        <input
          {...(directory ? { webkitdirectory: '', directory: '' } : {})}
          ref={inputRef}
          id={inputId}
          className="sr-only"
          type="file"
          name={name}
          required={required}
          disabled={currentOptions.disabled}
          accept={currentOptions.accept}
          multiple={directory || currentOptions.multiple}
          onChange={(event) => {
            const files = [...(event.currentTarget.files ?? [])]
            event.currentTarget.value = ''
            void upload.addFiles(files)
          }}
        />
      </div>
    </UploadContext>
  )
}
