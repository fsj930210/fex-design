import { filterPaginationInputNumberProps } from '@fex-design/core/pagination/create-pagination-controller'
import type { ComponentProps } from 'react'
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

export type PaginationQuickJumperProps = Omit<ComponentProps<'div'>, 'children'> & {
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
  inputProps?: ComponentProps<typeof InputNumberControl>
}
export function PaginationQuickJumper({
  inputActionsProps,
  incrementProps,
  decrementProps,
  inputNumberProps,
  disabled,
  inputProps,
  className,
  ...props
}: PaginationQuickJumperProps) {
  const { controller, snapshot, size } = usePaginationContext()
  return (
    <div
      {...props}
      data-slot="pagination-quick-jumper"
      className={cn(paginationQuickJumperClassName, className)}
    >
      <InputNumberRoot
        {...filterPaginationInputNumberProps(inputNumberProps)}
        step={1}
        className={cn(paginationInputControlClassName({ size }), inputNumberProps?.className)}
        size={size}
        min={1}
        max={Math.max(1, snapshot.pageCount)}
        precision={0}
        disabled={disabled || snapshot.disabled || snapshot.pageCount === 0}
      >
        <InputNumberControl
          {...inputProps}
          inputMode="numeric"
          aria-label={inputProps?.['aria-label'] ?? snapshot.labels.quickJumper}
          onKeyDown={(event) => {
            inputProps?.onKeyDown?.(event)
            if (
              disabled ||
              snapshot.disabled ||
              snapshot.pageCount === 0 ||
              event.defaultPrevented ||
              event.nativeEvent.isComposing ||
              event.key !== 'Enter'
            )
              return
            event.preventDefault()
            if (event.currentTarget.value.trim())
              controller.setPage(Number(event.currentTarget.value), 'jump')
          }}
        />
        <InputNumberActions {...inputActionsProps}>
          <InputNumberIncrement {...incrementProps} />
          <InputNumberDecrement {...decrementProps} />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
