import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import type { ComponentProps } from 'react'
import { getPaginationPageSizes } from '@fex-design/core/pagination/pagination-range'
import {
  paginationPageSizeSelectClassName,
  paginationSelectTriggerClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { SelectRoot, SelectTrigger, SelectContent } from '../select'
import { usePaginationContext } from './context'

export type PaginationPageSizeSelectProps = Omit<ComponentProps<'div'>, 'children'> & {
  selectRootProps?:
    | Omit<
        ComponentProps<typeof SelectRoot>,
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'disabled'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  selectTriggerProps?:
    | Omit<ComponentProps<typeof SelectTrigger>, 'children' | 'inputProps'>
    | undefined
  selectContentProps?: ComponentProps<typeof SelectContent> | undefined
  options?: readonly number[]
  disabled?: boolean
  inputProps?: ComponentProps<typeof SelectTrigger>['inputProps']
}
export function PaginationPageSizeSelect({
  selectRootProps,
  selectTriggerProps,
  selectContentProps,
  options,
  disabled,
  inputProps,
  className,
  ...props
}: PaginationPageSizeSelectProps) {
  const { controller, snapshot, size } = usePaginationContext()
  const items = getPaginationPageSizes(snapshot.pageSize, options).map((value) => ({
    value,
    label: snapshot.labels.pageSizeOption(value),
  }))
  return (
    <div
      {...props}
      data-slot="pagination-page-size-select"
      className={cn(paginationPageSizeSelectClassName, className)}
    >
      <SelectRoot
        {...filterControlledSelectProps(selectRootProps)}
        multiple={false}
        clearable={false}
        options={items}
        value={snapshot.pageSize}
        disabled={disabled || snapshot.disabled}
        onChange={(value) => {
          if (typeof value === 'number') controller.setPageSize(value)
        }}
      >
        <SelectTrigger
          {...selectTriggerProps}
          className={cn(paginationSelectTriggerClassName({ size }), selectTriggerProps?.className)}
          inputProps={{ 'aria-label': snapshot.labels.pageSize, ...inputProps }}
        />
        <SelectContent {...selectContentProps} />
      </SelectRoot>
    </div>
  )
}
