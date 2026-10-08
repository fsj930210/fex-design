import { createUploadController } from '@fex-design/core/upload/create-upload-controller'
import type {
  UploadController,
  UploadOptions,
} from '@fex-design/core/upload/types'
import {
  uploadRootClassName,
} from '@fex-design/components-styles/upload'
import { cn } from '@fex-design/utils'
import {
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { UploadContext } from './context'

export interface UploadRootProps<TResponse> extends ParentProps<
  JSX.HTMLAttributes<HTMLDivElement>
> {
  controller?: UploadController<TResponse>
  options?: UploadOptions<TResponse>
  invalid?: boolean
  name?: string
  required?: boolean
}

export function UploadRoot<TResponse>(props: UploadRootProps<TResponse>) {
  const [local, rest] = splitProps(props, [
    'controller',
    'options',
    'invalid',
    'name',
    'required',
    'class',
    'children',
  ])
  const owned = local.controller ? undefined : createUploadController(local.options ?? {})
  const upload = local.controller ?? owned!
  if (owned) onCleanup(() => owned.destroy())
  const [input, setInput] = createSignal<HTMLInputElement>()
  const inputId = createUniqueId()
  const listId = createUniqueId()
  const directory = () => upload.hasFeature('directory')
  return (
    <UploadContext.Provider
      value={{ upload, input, setInput, inputId, listId, invalid: () => local.invalid ?? false }}
    >
      <div
        {...rest}
        class={cn(uploadRootClassName(), local.class)}
        data-disabled={upload.getOptions().disabled || undefined}
        data-invalid={local.invalid || undefined}
      >
        {local.children}
        <input
          ref={setInput}
          id={inputId}
          class="sr-only"
          type="file"
          name={local.name}
          required={local.required}
          disabled={upload.getOptions().disabled}
          accept={upload.getOptions().accept}
          multiple={directory() || upload.getOptions().multiple}
          {...(directory() ? { webkitdirectory: '', directory: '' } : {})}
          onChange={(event) => {
            const files = [...(event.currentTarget.files ?? [])]
            event.currentTarget.value = ''
            void upload.addFiles(files)
          }}
        />
      </div>
    </UploadContext.Provider>
  )
}
