import { filterPaginationInputNumberProps } from '@fex-design/core/pagination/create-pagination-controller'
import { splitProps, type ComponentProps, type JSX } from 'solid-js'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import {
  paginationQuickJumperClassName,
  paginationInputControlClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '../input-number'
import { usePaginationContext } from './context'

export type PaginationQuickJumperProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
  inputActionsProps?: ComponentProps<typeof InputNumberActions> | undefined
  incrementProps?: Omit<ComponentProps<typeof InputNumberIncrement>, 'children'> | undefined
  decrementProps?: Omit<ComponentProps<typeof InputNumberDecrement>, 'children'> | undefined

  inputNumberProps?:
    | Omit<
        ComponentProps<typeof InputNumberRoot>,
        | 'children'
        | 'value'
        | 'defaultValue'
        | 'controlled'
        | 'onChange'
        | 'min'
        | 'max'
        | 'step'
        | 'precision'
        | 'parser'
        | 'formatter'
        | 'disabled'
        | 'readOnly'
        | 'size'
      >
    | undefined
  disabled?: boolean
  inputProps?: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'type'>
}
export function PaginationQuickJumper(props: PaginationQuickJumperProps) {
  const [local, rest] = splitProps(props, [
    'inputActionsProps',
    'incrementProps',
    'decrementProps',
    'inputNumberProps',
    'disabled',
    'class',
    'inputProps',
  ])
  const { controller, snapshot, size } = usePaginationContext()
  return (
    <div
      {...rest}
      data-slot="pagination-quick-jumper"
      class={cn(paginationQuickJumperClassName, local.class)}
    >
      <InputNumberRoot
        {...filterPaginationInputNumberProps(local.inputNumberProps)}
        step={1}
        class={cn(paginationInputControlClassName({ size: size() }), local.inputNumberProps?.class)}
        size={size()}
        min={1}
        max={Math.max(1, snapshot().pageCount)}
        precision={0}
        disabled={local.disabled || snapshot().disabled || snapshot().pageCount === 0}
      >
        <InputNumberControl
          {...local.inputProps}
          inputMode="numeric"
          aria-label={local.inputProps?.['aria-label'] ?? snapshot().labels.quickJumper}
          onKeyDown={(event) => {
            callEventHandler(local.inputProps?.onKeyDown, event)
            if (
              local.disabled ||
              snapshot().disabled ||
              snapshot().pageCount === 0 ||
              event.defaultPrevented ||
              event.isComposing ||
              event.key !== 'Enter'
            )
              return
            event.preventDefault()
            if (event.currentTarget.value.trim())
              controller.setPage(Number(event.currentTarget.value), 'jump')
          }}
        />
        <InputNumberActions {...local.inputActionsProps}>
          <InputNumberIncrement {...local.incrementProps} />
          <InputNumberDecrement {...local.decrementProps} />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
