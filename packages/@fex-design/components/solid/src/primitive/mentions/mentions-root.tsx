import { createMentionsController } from '@fex-design/core/mentions/create-mentions-controller'
import type {
  MentionsChangeMeta,
  MentionsControllerConfig,
  MentionsOpenReason,
  MentionsParseInput,
  MentionsQuery,
  MentionsRegisteredItem,
  MentionsSearchMeta,
  MentionsSelectMeta,
} from '@fex-design/core/mentions/types'
import { mentionsRootClassName } from '@fex-design/components-styles/mentions'
import { cn } from '@fex-design/utils'
import {
  createUniqueId,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { MentionsContext, type MentionsContextValue } from './mentions-context'

function normalizePrefix(prefix: string | readonly string[] | undefined) {
  return Array.isArray(prefix) ? prefix : prefix ? [prefix] : ['@']
}

export interface MentionsRootProps<TData = unknown> extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>
> {
  value?: string | undefined
  defaultValue?: string | undefined
  onChange?: ((value: string, meta: MentionsChangeMeta) => void) | undefined
  prefix?: string | readonly string[] | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean, meta: { reason: MentionsOpenReason }) => void) | undefined
  onSearch?: ((text: string, meta: MentionsSearchMeta) => void) | undefined
  onSelect?: ((item: MentionsRegisteredItem<TData>, meta: MentionsSelectMeta) => void) | undefined
  parseQuery?: ((input: MentionsParseInput) => MentionsQuery | null) | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  invalid?: boolean | undefined
  required?: boolean | undefined
  status?: 'error' | 'warning' | undefined
}

export function MentionsRoot<TData = unknown>(props: MentionsRootProps<TData>) {
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'value',
    'defaultValue',
    'prefix',
    'open',
    'defaultOpen',
    'onChange',
    'onOpenChange',
    'onSearch',
    'onSelect',
    'parseQuery',
    'disabled',
    'readOnly',
    'invalid',
    'required',
    'status',
  ])
  const config: MentionsControllerConfig<TData> = {
    get value() {
      return props.value
    },
    get defaultValue() {
      return props.defaultValue
    },
    get open() {
      return props.open
    },
    get defaultOpen() {
      return props.defaultOpen
    },
    get prefixes() {
      return normalizePrefix(props.prefix)
    },
    get parseQuery() {
      return props.parseQuery
    },
    onChange: (value, meta) => props.onChange?.(value, meta),
    onOpenChange: (open, meta) => props.onOpenChange?.(open, meta),
    onSearch: (text, meta) => props.onSearch?.(text, meta),
    onSelect: (item, meta) => props.onSelect?.(item as MentionsRegisteredItem<TData>, meta),
  }
  const controller = createMentionsController<TData>(config)
  const snapshot = createCoreStoreSignal(controller)
  const context: MentionsContextValue = {
    controller,
    snapshot,
    listId: 'mentions-' + createUniqueId(),
    disabled: () => props.disabled === true,
    readOnly: () => props.readOnly === true,
    invalid: () => props.invalid === true || props.status === 'error',
    required: () => props.required === true,
  }
  return (
    <MentionsContext.Provider value={context}>
      <div {...rest} data-slot="mentions-root" class={cn(mentionsRootClassName, local.class)}>
        {local.children}
      </div>
    </MentionsContext.Provider>
  )
}
