import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectClearClassName,
  selectClearableIndicatorClassName,
  selectIndicatorClassName,
  selectPlaceholderClassName,
  selectSuffixClassName,
  selectValueClassName,
  selectValueContainerClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronDownIcon } from '@fex-design/react/icons/chevron'
import { LoadingIcon } from '@fex-design/react/icons/loading'
import { Tag, TagAction } from '../tag/tag'
import { InputClear, InputControl, InputPrefix, InputRoot, InputSuffix } from '../input/input'
import type { InputProps } from '../../ui/input/input.types'
import { PopoverTrigger } from '../popover/popover'
import { useSelect } from './use-select'

export interface SelectTriggerProps extends Omit<ComponentProps<'div'>, 'children' | 'prefix'> {
  children?: ReactNode
  inputProps?: SelectInputProps
  maxTagCount?: number
  placeholder?: string
  tagRender?: (
    option: SelectOption,
    context: { remove: () => void; disabled: boolean },
  ) => ReactNode
}

export type SelectInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onValueChange' | 'addonBefore' | 'addonAfter' | 'clearable'
>

export function SelectTrigger({
  children,
  inputProps,
  tagRender,
  maxTagCount,
  placeholder = '请选择',
  className,
  onKeyDown,
  ...props
}: SelectTriggerProps) {
  const select = useSelect()
  const hasValue = select.selection.values.length > 0
  const {
    prefix,
    suffix,
    clear,
    className: inputClassName,
    style: inputStyle,
    classNames,
    styles,
    onKeyDown: inputOnKeyDown,
    onFocus,
    ...controlProps
  } = inputProps ?? {}
  const indicator = suffix ?? (
    <span
      data-state={select.snapshot.open ? 'open' : 'closed'}
      className={selectIndicatorClassName}
    >
      <ChevronDownIcon aria-hidden />
    </span>
  )
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    inputOnKeyDown?.(event as KeyboardEvent<HTMLInputElement>)
    if (event.defaultPrevented) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      select.controller.open()
      select.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      select.controller.moveActiveTo(event.key === 'Home' ? 'first' : 'last')
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select.controller.selectActive()
    } else if (event.key === 'Backspace' && !select.snapshot.searchValue)
      select.controller.removeLastSelected()
    else if (event.key === 'Escape') select.controller.close()
  }
  return (
    <PopoverTrigger>
      {(triggerProps) => (
        <InputRoot
          {...props}
          {...(triggerProps as ComponentProps<'div'>)}
          role={undefined}
          aria-haspopup="listbox"
          data-slot="select-trigger"
          data-clearable={select.clearable && hasValue ? 'true' : undefined}
          data-status={select.status}
          value={select.snapshot.searchValue}
          disabled={select.disabled}
          readOnly={!select.showSearch}
          className={cn(
            'group/select-trigger cursor-pointer',
            classNames?.root,
            inputClassName,
            className,
          )}
          style={{ ...styles?.root, ...inputStyle, ...props.style }}
          onValueChange={(value) => {
            select.controller.setSearchValue(value)
            select.controller.open()
          }}
          onClick={(event) => {
            props.onClick?.(event)
            if (!event.defaultPrevented) select.controller.open()
          }}
          onKeyDown={handleKeyDown}
        >
          {prefix != null ? (
            <InputPrefix className={classNames?.prefix} style={styles?.prefix}>
              {prefix}
            </InputPrefix>
          ) : null}
          <div className={selectValueContainerClassName}>
            {children ?? (
              <SelectValue
                placeholder={placeholder}
                maxTagCount={maxTagCount}
                tagRender={tagRender}
              />
            )}
            <InputControl
              {...controlProps}
              role="combobox"
              aria-haspopup="listbox"
              aria-invalid={select.status === 'error' || undefined}
              aria-expanded={select.snapshot.open}
              aria-controls={select.listId}
              aria-activedescendant={
                select.snapshot.activeValue === undefined
                  ? undefined
                  : `${select.listId}-${select.snapshot.activeValue}`
              }
              placeholder={select.showSearch && !hasValue ? placeholder : undefined}
              className={cn(
                classNames?.control,
                !select.showSearch && 'absolute size-px min-w-0 overflow-hidden opacity-0',
              )}
              style={styles?.control}
              onFocus={(event) => {
                onFocus?.(event)
                if (!event.defaultPrevented) select.controller.open()
              }}
            />
          </div>
          <InputSuffix
            data-slot="select-suffix"
            className={cn(selectSuffixClassName, classNames?.suffix)}
            style={styles?.suffix}
          >
            {select.loading ? <LoadingIcon className="animate-spin" /> : null}
            <span className={select.clearable && hasValue ? selectClearableIndicatorClassName : undefined}>
              {indicator}
            </span>
            {select.clearable && hasValue ? (
              <InputClear
                className={selectClearClassName}
                aria-label="Clear selection"
                onPointerDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  select.controller.clear()
                }}
              >
                {clear}
              </InputClear>
            ) : null}
          </InputSuffix>
        </InputRoot>
      )}
    </PopoverTrigger>
  )
}

export interface SelectValueProps extends ComponentProps<'div'> {
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
  className,
  ...props
}: SelectValueProps) {
  const select = useSelect()
  if (children)
    return (
      <div {...props} className={cn(selectValueClassName, className)}>
        {children}
      </div>
    )
  if (!select.selectedOptions.length)
    return select.showSearch || select.snapshot.searchValue ? null : (
      <span className={selectPlaceholderClassName}>{placeholder}</span>
    )
  if (!select.multiple && select.showSearch && select.snapshot.open) return null
  if (!select.multiple)
    return (
      <div {...props} className={cn(selectValueClassName, className)}>
        {select.selectedOptions[0]?.label}
      </div>
    )
  const visibleOptions =
    maxTagCount === undefined
      ? select.selectedOptions
      : select.selectedOptions.slice(0, Math.max(0, maxTagCount))
  const overflowCount = select.selectedOptions.length - visibleOptions.length
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
          <Tag key={option.value} size="sm" onPointerDownCapture={(event) => event.preventDefault()}>
            {option.label}
            <TagAction
              aria-label={`Remove ${String(option.label)}`}
              onClick={(event) => {
                event.stopPropagation()
                select.removeValue(option.value)
              }}
            />
          </Tag>
        ),
      )}
      {overflowCount > 0 ? <Tag size="sm">+{overflowCount}</Tag> : null}
    </div>
  )
}
