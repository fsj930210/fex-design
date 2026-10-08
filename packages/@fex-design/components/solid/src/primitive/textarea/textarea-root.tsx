import { type TextareaAutoSize } from '@fex-design/core/textarea/autosize'
import { textareaRootClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { Show } from 'solid-js'
import {
  createTextarea,
  TextareaContext,
  type TextareaChangeReason,
} from './textarea-context'
import { TextareaClear } from './textarea-clear'

export interface TextareaRootProps extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>
> {
  value?: string | undefined
  defaultValue?: string | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  invalid?: boolean | undefined
  status?: 'error' | 'warning' | undefined
  autoSize?: TextareaAutoSize | undefined
  allowClear?: boolean | undefined
  onChange?:
    | ((value: string, meta: { reason: TextareaChangeReason; event?: InputEvent }) => void)
    | undefined
  onClear?: (() => void) | undefined
}

export function TextareaRoot(props: TextareaRootProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'value',
    'defaultValue',
    'disabled',
    'readOnly',
    'invalid',
    'status',
    'autoSize',
    'allowClear',
    'onChange',
    'onClear',
  ])
  const textarea = createTextarea({
    value: () => props.value,
    defaultValue: props.defaultValue,
    disabled: () => props.disabled,
    readOnly: () => props.readOnly,
    invalid: () => props.invalid || props.status === 'error',
    autoSize: () => props.autoSize,
    onChange: (value, meta) => props.onChange?.(value, meta),
    onClear: () => props.onClear?.(),
  })

  return (
    <TextareaContext.Provider value={textarea}>
      <div
        {...rest}
        data-slot="textarea-root"
        data-disabled={textarea.disabled() || undefined}
        data-readonly={textarea.readOnly() || undefined}
        data-invalid={textarea.invalid() || undefined}
        data-status={local.status}
        class={cn(textareaRootClassName, local.class)}
      >
        {local.children}
        <Show when={local.allowClear}>
          <TextareaClear />
        </Show>
      </div>
    </TextareaContext.Provider>
  )
}
