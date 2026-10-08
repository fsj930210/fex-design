import { textareaRootClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import {
  TextareaContext,
  useTextarea,
  type TextareaClearRenderProps,
  type UseTextareaOptions,
} from './textarea-context'
import { TextareaClear } from './textarea-clear'

export interface TextareaRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, UseTextareaOptions {
  status?: 'error' | 'warning' | undefined
  allowClear?: boolean | ((props: TextareaClearRenderProps) => ReactNode) | undefined
  ref?: Ref<HTMLDivElement> | undefined
}

export function TextareaRoot({
  value,
  defaultValue,
  disabled,
  readOnly,
  invalid = false,
  status,
  autoSize,
  onChange,
  onClear,
  allowClear,
  className,
  children,
  ref,
  ...props
}: TextareaRootProps) {
  const resolvedInvalid = invalid || status === 'error'
  const textarea = useTextarea({
    value,
    defaultValue,
    disabled,
    readOnly,
    invalid: resolvedInvalid,
    autoSize,
    onChange,
    onClear,
  })

  return (
    <TextareaContext value={textarea}>
      <div
        {...props}
        ref={ref}
        data-slot="textarea-root"
        data-disabled={textarea.disabled ? 'true' : undefined}
        data-readonly={textarea.readOnly ? 'true' : undefined}
        data-invalid={textarea.invalid ? 'true' : undefined}
        data-status={status}
        className={cn(textareaRootClassName, className)}
      >
        {children}
        {allowClear ? (
          <TextareaClear>{typeof allowClear === 'function' ? allowClear : undefined}</TextareaClear>
        ) : null}
      </div>
    </TextareaContext>
  )
}
