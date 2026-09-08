import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/styles/input'
import { cn } from '@fex/utils'
import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { EyeIcon } from '../../icon/eye'
import { EyeOffIcon } from '../../icon/eye-off'
import { LoadingIcon } from '../../icon/loading'
import { SearchIcon } from '../../icon/search'
import { Button } from '../button/button'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputClear,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
  InputSuffix,
} from '../../primitive/input/input'
import type { InputProps, InputPasswordProps, InputSearchProps } from './input.types'

export type { InputProps, InputPasswordProps, InputSearchProps } from './input.types'

function renderInput(props: InputProps, type?: string, suffixAction?: ReactNode) {
  const {
    value,
    defaultValue,
    onValueChange,
    size = 'md',
    variant = 'outlined',
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    clearable = false,
    clearIcon,
    className,
    style,
    classNames,
    styles,
    disabled,
    readOnly,
    ref,
    ...controlProps
  } = props

  const root = (
    <InputRoot
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      disabled={disabled}
      readOnly={readOnly}
      size={size}
      variant={variant}
      className={cn(classNames?.root, className)}
      style={{ ...styles?.root, ...style }}
    >
      {prefix != null ? (
        <InputPrefix className={classNames?.prefix} style={styles?.prefix}>
          {prefix}
        </InputPrefix>
      ) : null}
      <InputControl
        {...controlProps}
        ref={ref}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        className={classNames?.control}
        style={styles?.control}
      />
      {clearable ? (
        <InputClear className={classNames?.clear} style={styles?.clear}>
          {clearIcon}
        </InputClear>
      ) : null}
      {suffix != null || suffixAction != null ? (
        <InputSuffix className={classNames?.suffix} style={styles?.suffix}>
          {suffix}
          {suffixAction}
        </InputSuffix>
      ) : null}
    </InputRoot>
  )

  if (addonBefore == null && addonAfter == null) return root

  return (
    <InputGroup>
      {addonBefore != null ? (
        <InputAddonBefore className={classNames?.addonBefore} style={styles?.addonBefore}>
          {addonBefore}
        </InputAddonBefore>
      ) : null}
      {root}
      {addonAfter != null ? (
        <InputAddonAfter className={classNames?.addonAfter} style={styles?.addonAfter}>
          {addonAfter}
        </InputAddonAfter>
      ) : null}
    </InputGroup>
  )
}

export function Input(props: InputProps) {
  return renderInput(props)
}

export function InputPassword({ visibilityToggle = true, ...props }: InputPasswordProps) {
  const [visible, setVisible] = useState(false)
  const toggle = visibilityToggle ? (
    <button
      type="button"
      data-slot="input-action"
      aria-label={visible ? 'Hide password' : 'Show password'}
      aria-pressed={visible}
      className={cn(inputActionClassName, props.classNames?.action)}
      style={props.styles?.action}
      onClick={() => setVisible((current) => !current)}
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  ) : null
  return renderInput(props, visible ? 'text' : 'password', toggle)
}

function SearchAction({
  children,
  loading,
  source,
  onClick,
  styled = false,
}: {
  children: ReactNode
  loading: boolean
  source: 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter'
  onClick: (source: 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter') => void
  styled?: boolean
}) {
  if (styled) {
    return (
      <Button
        variant="solid"
        color="primary"
        loading={loading}
        data-input-addon-fill=""
        aria-label="Search"
        className={inputSearchAddonClassName}
        onClick={() => onClick(source)}
      >
        {loading ? null : children}
      </Button>
    )
  }
  return (
    <button
      type="button"
      data-input-addon-fill=""
      aria-label="Search"
      disabled={loading}
      className={inputActionClassName}
      onClick={() => onClick(source)}
    >
      {loading ? <LoadingIcon className="animate-spin" /> : children}
    </button>
  )
}

export function InputSearch({
  value,
  defaultValue = '',
  onValueChange,
  prefix = null,
  suffix = null,
  addonBefore = null,
  addonAfter = <SearchIcon />,
  loading = false,
  onSearch,
  onKeyDown,
  ...props
}: InputSearchProps) {
  const [currentValue, setCurrentValue] = useControllableState(
    { value, defaultValue, onValueChange },
    { trigger: 'onValueChange' },
  )
  const search = (source: 'enter' | 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter') => {
    if (!loading) onSearch?.(currentValue, { source })
  }
  const action = (content: ReactNode, source: 'prefix' | 'suffix' | 'addonBefore' | 'addonAfter', styled = false) =>
    content == null ? null : (
      <SearchAction loading={loading} source={source} styled={styled} onClick={search}>
        {content}
      </SearchAction>
    )

  return renderInput({
    ...props,
    value: currentValue,
    onValueChange: setCurrentValue,
    prefix: action(prefix, 'prefix'),
    suffix: action(suffix, 'suffix'),
    addonBefore: action(addonBefore, 'addonBefore', true),
    addonAfter: action(addonAfter, 'addonAfter', true),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (!event.defaultPrevented && event.key === 'Enter') search('enter')
    },
  })
}

export { InputGroup }
