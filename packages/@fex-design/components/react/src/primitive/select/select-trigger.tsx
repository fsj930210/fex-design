import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectIndicatorClassName,
  selectInputClassName,
  selectPlaceholderClassName,
  selectSuffixClassName,
  selectValueClassName,
  selectValueContainerClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronDownIcon } from '@fex-design/react/icons/chevron'
import { LoadingIcon } from '@fex-design/react/icons/loading'
import { Tag } from '../tag/tag'
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
  placeholder,
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
    onPointerDown,
    onClick,
    onChange,
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
          data-slot="select-trigger"
          data-disabled={select.disabled ? 'true' : undefined}
          data-status={select.status}
          aria-invalid={select.status === 'error' || undefined}
          value={select.snapshot.searchValue}
          disabled={select.disabled}
          readOnly={!select.showSearch}
          className={cn('cursor-pointer', classNames?.root, inputClassName, className)}
          style={{ ...styles?.root, ...inputStyle, ...props.style }}
          onValueChange={(value) => {
            select.controller.setSearchValue(value)
            select.controller.open()
          }}
          onKeyDown={handleKeyDown}
        >
          {prefix != null ? (
            <InputPrefix className={classNames?.prefix} style={styles?.prefix}>
              {prefix}
            </InputPrefix>
          ) : null}
          <div className={selectValueContainerClassName}>
            {children}
            <InputControl
              {...controlProps}
              role="combobox"
              aria-expanded={select.snapshot.open}
              aria-controls={select.listId}
              aria-activedescendant={
                select.snapshot.activeValue === undefined
                  ? undefined
                  : `${select.listId}-${select.snapshot.activeValue}`
              }
              disabled={select.disabled}
              readOnly={!select.showSearch}
              placeholder={select.showSearch && !hasValue ? placeholder : undefined}
              value={select.snapshot.searchValue}
              className={cn(
                classNames?.control,
                !select.showSearch && 'absolute size-px min-w-0 overflow-hidden opacity-0',
              )}
              style={styles?.control}
              onFocus={(event) => {
                onFocus?.(event)
                if (!event.defaultPrevented) select.controller.open()
              }}
              onPointerDown={onPointerDown}
              onClick={(event) => {
                onClick?.(event)
              }}
              onChange={(event) => {
                onChange?.(event)
              }}
            />
          </div>
          <InputSuffix
            data-slot="select-suffix"
            className={cn(classNames?.suffix)}
            style={styles?.suffix}
          >
            {select.loading ? <LoadingIcon className="animate-spin" /> : null}
            {select.clearable && hasValue ? (
              <InputClear
                onClick={(event) => {
                  event.stopPropagation()
                  select.controller.clear()
                }}
              >
                {clear}
              </InputClear>
            ) : (
              indicator
            )}
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
  if (!select.selectedOptions.length) return null
  // return select.snapshot.searchValue ? null : (
  //   <span className={selectPlaceholderClassName}>{placeholder ?? select.placeholder}</span>
  // )
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
          <Tag
            key={option.value}
            size="sm"
            closable
            closeLabel={`Remove ${String(option.label)}`}
            onPointerDownCapture={(event) => event.preventDefault()}
            onClose={(event) => {
              event.stopPropagation()
              select.removeValue(option.value)
            }}
          >
            {option.label}
          </Tag>
        ),
      )}
      {overflowCount > 0 ? <Tag size="sm">+{overflowCount}</Tag> : null}
    </div>
  )
}
