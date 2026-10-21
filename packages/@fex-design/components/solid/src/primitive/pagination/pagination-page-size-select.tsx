import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import { createMemo, splitProps, type ComponentProps, type JSX } from 'solid-js'
import { getPaginationPageSizes } from '@fex-design/core/pagination/pagination-range'
import {
  paginationPageSizeSelectClassName,
  paginationSelectTriggerClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { SelectRoot, SelectTrigger, SelectContent, type SelectInputProps } from '../select'
import { usePaginationContext } from './context'

export type PaginationPageSizeSelectProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
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
  inputProps?: SelectInputProps
}
export function PaginationPageSizeSelect(props: PaginationPageSizeSelectProps) {
  const [local, rest] = splitProps(props, [
    'selectRootProps',
    'selectTriggerProps',
    'selectContentProps',
    'options',
    'disabled',
    'class',
    'inputProps',
  ])
  const { controller, snapshot, size } = usePaginationContext()
  const items = createMemo(() =>
    getPaginationPageSizes(snapshot().pageSize, local.options).map((value) => ({
      value,
      label: snapshot().labels.pageSizeOption(value),
    })),
  )
  return (
    <div
      {...rest}
      data-slot="pagination-page-size-select"
      class={cn(paginationPageSizeSelectClassName, local.class)}
    >
      <SelectRoot
        {...filterControlledSelectProps(local.selectRootProps)}
        multiple={false}
        clearable={false}
        options={items()}
        value={snapshot().pageSize}
        disabled={local.disabled || snapshot().disabled}
        onChange={(value) => {
          if (typeof value === 'number') controller.setPageSize(value)
        }}
      >
        <SelectTrigger
          {...local.selectTriggerProps}
          class={cn(
            paginationSelectTriggerClassName({ size: size() }),
            local.selectTriggerProps?.class,
          )}
          inputProps={{ 'aria-label': snapshot().labels.pageSize, ...local.inputProps }}
        />
        <SelectContent {...local.selectContentProps} />
      </SelectRoot>
    </div>
  )
}
