import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/styles/input'
import type { InputSearchMeta } from '@fex-design/core/input/types'
import { cn } from '@fex/utils'
import { createMemo, createSignal, Show, splitProps, type JSX } from 'solid-js'
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
import type { InputPasswordProps, InputProps, InputSearchProps } from './input.types'

export type { InputPasswordProps, InputProps, InputSearchProps } from './input.types'

export function Input(props: InputProps) {
  const [local, control] = splitProps(props, [
    'value',
    'defaultValue',
    'onValueChange',
    'size',
    'variant',
    'prefix',
    'suffix',
    'addonBefore',
    'addonAfter',
    'clearable',
    'clear',
    'classNames',
    'styles',
    'class',
    'style',
    'disabled',
    'readOnly',
  ])
  const rootStyle = () =>
    local.styles?.root
      ? { ...local.styles.root, ...(typeof local.style === 'object' ? local.style : {}) }
      : local.style
  const root = (
    <InputRoot
      value={local.value}
      defaultValue={local.defaultValue}
      onValueChange={(value) => local.onValueChange?.(value)}
      size={local.size}
      variant={local.variant}
      disabled={local.disabled}
      readOnly={local.readOnly}
      class={cn(local.classNames?.root, local.class)}
      style={rootStyle()}
    >
      {local.prefix != null && (
        <InputPrefix class={local.classNames?.prefix} style={local.styles?.prefix}>
          {local.prefix}
        </InputPrefix>
      )}
      <InputControl
        {...control}
        disabled={local.disabled}
        readOnly={local.readOnly}
        class={local.classNames?.control}
        style={local.styles?.control}
      />
      {local.clearable && (
        <InputClear class={local.classNames?.clear} style={local.styles?.clear}>
          {local.clear}
        </InputClear>
      )}
      {local.suffix != null && (
        <InputSuffix class={local.classNames?.suffix} style={local.styles?.suffix}>
          {local.suffix}
        </InputSuffix>
      )}
    </InputRoot>
  )
  const hasAddon = () => local.addonBefore != null || local.addonAfter != null
  return (
    <Show when={hasAddon()} fallback={root}>
      <InputGroup>
        {local.addonBefore != null && (
          <InputAddonBefore class={local.classNames?.addonBefore} style={local.styles?.addonBefore}>
            {local.addonBefore}
          </InputAddonBefore>
        )}
        {root}
        {local.addonAfter != null && (
          <InputAddonAfter class={local.classNames?.addonAfter} style={local.styles?.addonAfter}>
            {local.addonAfter}
          </InputAddonAfter>
        )}
      </InputGroup>
    </Show>
  )
}

export function InputPassword(props: InputPasswordProps) {
  const [local, inputProps] = splitProps(props, ['visibilityToggle', 'suffix'])
  const [visible, setVisible] = createSignal(false)
  const suffix = () => (
    <>
      {local.suffix}
      {local.visibilityToggle !== false && (
        <button
          type="button"
          data-slot="input-action"
          aria-label={visible() ? 'Hide password' : 'Show password'}
          aria-pressed={visible()}
          class={cn(inputActionClassName, props.classNames?.action)}
          style={props.styles?.action}
          onClick={() => setVisible(!visible())}
        >
          {visible() ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
    </>
  )
  return <Input {...inputProps} type={visible() ? 'text' : 'password'} suffix={suffix()} />
}

function SearchAction(props: {
  children: JSX.Element
  loading: boolean
  styled?: boolean
  onClick: () => void
}) {
  return props.styled ? (
    <Button
      variant="solid"
      color="primary"
      loading={props.loading}
      data-input-addon-fill=""
      aria-label="Search"
      class={inputSearchAddonClassName}
      onClick={props.onClick}
    >
      {props.loading ? null : props.children}
    </Button>
  ) : (
    <button
      type="button"
      data-input-addon-fill=""
      aria-label="Search"
      disabled={props.loading}
      class={inputActionClassName}
      onClick={props.onClick}
    >
      {props.loading ? <LoadingIcon class="animate-spin" /> : props.children}
    </button>
  )
}

export function InputSearch(props: InputSearchProps) {
  const [local, inputProps] = splitProps(props, [
    'value',
    'defaultValue',
    'onValueChange',
    'onSearch',
    'loading',
    'prefix',
    'suffix',
    'addonBefore',
    'addonAfter',
    'onKeyDown',
  ])
  const [internal, setInternal] = createSignal(local.defaultValue ?? '')
  const current = createMemo(() => local.value ?? internal())
  const search = (source: InputSearchMeta['source']) => {
    if (!local.loading) local.onSearch?.(current(), { source })
  }
  const update = (value: string) => {
    if (local.value === undefined) setInternal(value)
    local.onValueChange?.(value)
  }
  const action = (content: JSX.Element, source: InputSearchMeta['source'], styled = false) =>
    content == null ? null : (
      <SearchAction loading={local.loading ?? false} styled={styled} onClick={() => search(source)}>
        {content}
      </SearchAction>
    )
  return (
    <Input
      {...inputProps}
      value={current()}
      onValueChange={update}
      prefix={action(local.prefix, 'prefix')}
      suffix={action(local.suffix, 'suffix')}
      addonBefore={action(local.addonBefore, 'addonBefore', true)}
      addonAfter={action(
        local.addonAfter === undefined ? <SearchIcon /> : local.addonAfter,
        'addonAfter',
        true,
      )}
      onKeyDown={(event) => {
        if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
        if (!event.defaultPrevented && event.key === 'Enter') search('enter')
      }}
    />
  )
}

export { InputGroup }
