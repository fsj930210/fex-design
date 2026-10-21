import { type ComponentProps, type ReactNode } from 'react'
import { useSelect } from './use-select'
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectPlaceholderClassName,
  selectValueClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { Tag, TagAction } from '../tag'

type SelectedTagProps = Omit<ComponentProps<typeof Tag>, 'children' | 'disabled'>
type SelectedTagActionProps = Omit<ComponentProps<typeof TagAction>, 'children' | 'onClick'>

export interface SelectValueProps extends ComponentProps<'div'> {
  tagProps?: SelectedTagProps | ((option: SelectOption) => SelectedTagProps) | undefined
  tagActionProps?:
    | SelectedTagActionProps
    | ((option: SelectOption) => SelectedTagActionProps)
    | undefined
  overflowTagProps?: SelectedTagProps | undefined
  maxTagCount?: number | undefined
  placeholder?: string | undefined
  tagRender?:
    | ((option: SelectOption, context: { remove: () => void; disabled: boolean }) => ReactNode)
    | undefined
}

export function SelectValue({
  children,
  maxTagCount,
  placeholder = '请选择',
  tagRender,
  tagProps,
  tagActionProps,
  overflowTagProps,
  className,
  ...props
}: SelectValueProps) {
  const select = useSelect()
  if (children != null)
    return (
      <div {...props} className={cn(selectValueClassName, className)}>
        {children}
      </div>
    )
  const layout = getSelectValueLayout(select.selectedOptions, {
    multiple: select.multiple,
    showSearch: select.showSearch,
    open: select.snapshot.open,
    searchValue: select.snapshot.searchValue,
    maxTagCount,
  })
  if (layout.showPlaceholder)
    return <span className={selectPlaceholderClassName}>{placeholder}</span>
  if (layout.showSingle)
    return (
      <div {...props} className={cn(selectValueClassName, className)}>
        {select.selectedOptions[0]?.label}
      </div>
    )
  if (!layout.showTags) return null
  const { visibleOptions, overflowCount } = layout
  return (
    <div {...props} className={cn(selectValueClassName, className)}>
      {visibleOptions.map((option) =>
        tagRender ? (
          <span key={option.value}>
            {tagRender(option, {
              remove: () => select.removeValue(option.value),
              disabled: option.disabled === true,
            })}
          </span>
        ) : (
          <Tag
            key={option.value}
            size="sm"
            {...(typeof tagProps === 'function' ? tagProps(option) : tagProps)}
            disabled={select.disabled || option.disabled === true}
            onPointerDownCapture={(event) => event.preventDefault()}
          >
            {option.label}
            <TagAction
              {...(typeof tagActionProps === 'function' ? tagActionProps(option) : tagActionProps)}
              aria-label={`Remove ${String(option.label)}`}
              onClick={(event) => {
                event.stopPropagation()
                select.removeValue(option.value)
              }}
            />
          </Tag>
        ),
      )}
      {overflowCount > 0 ? (
        <Tag size="sm" {...overflowTagProps}>
          +{overflowCount}
        </Tag>
      ) : null}
    </div>
  )
}
