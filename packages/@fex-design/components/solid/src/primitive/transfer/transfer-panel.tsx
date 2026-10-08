import type { createTransferController } from '@fex-design/core/transfer/create-transfer-controller'
import type { TransferDataItem, TransferKey, TransferSide } from '@fex-design/core/transfer/types'
import {
  readTransferDisabled,
  readTransferKey,
  type TransferResolvedFieldNames,
} from '@fex-design/core/transfer/utils'
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from '@fex-design/components-styles/checkbox'
import { listboxItemClassName, listboxRootClassName } from '@fex-design/components-styles/listbox'
import {
  transferPanelBodyClassName,
  transferPanelFooterClassName,
  transferPanelHeaderClassName,
  transferSourcePanelClassName,
  transferTargetPanelClassName,
} from '@fex-design/components-styles/transfer'
import { For, Show, type JSX } from 'solid-js'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { MinusIcon } from '@fex-design/solid/icons/minus'
import { CheckboxControl, CheckboxIndicator, CheckboxRoot } from '../checkbox'
import { ListboxItem, ListboxRoot } from '../listbox'

export interface TransferPanelApi<TItem extends TransferDataItem> {
  side: TransferSide
  items: readonly TItem[]
  checkedKeys: readonly TransferKey[]
  controller: ReturnType<typeof createTransferController<TItem>>
  setCheckedKeys(keys: readonly TransferKey[]): void
  isChecked(key: TransferKey): boolean
}

export interface TransferPanelOptions<TItem extends TransferDataItem> {
  header?: ((api: TransferPanelApi<TItem>) => JSX.Element) | false
  body?: (api: TransferPanelApi<TItem>) => JSX.Element
  footer?: (api: TransferPanelApi<TItem>) => JSX.Element
}

export interface TransferPanelProps<TItem extends TransferDataItem> {
  side: TransferSide
  api: TransferPanelApi<TItem>
  fields: TransferResolvedFieldNames
  disabled?: boolean | undefined
  title?: JSX.Element | undefined
  options?: TransferPanelOptions<TItem> | undefined
  renderItem?: ((item: TItem) => JSX.Element) | undefined
}

export function TransferPanel<TItem extends TransferDataItem>(props: TransferPanelProps<TItem>) {
  const enabledKeys = () =>
    props.api.items
      .filter((item) => !readTransferDisabled(item, props.fields))
      .map((item) => readTransferKey(item, props.fields))

  const defaultHeader = () => {
    const enabled = enabledKeys()
    const count = enabled.filter((key) => props.api.checkedKeys.includes(key)).length
    const checked =
      count === enabled.length && enabled.length > 0 ? true : count > 0 ? 'indeterminate' : false
    const title = () => props.title ?? (props.side === 'source' ? 'Source' : 'Target')
    return (
      <>
        <CheckboxRoot disabled={props.disabled || enabled.length === 0}>
          <CheckboxControl
            checked={checked === true}
            indeterminate={checked === 'indeterminate'}
            class={checkboxControlClassName}
            aria-label={`Select all ${title()}`}
            onChange={(event) => props.api.setCheckedKeys(event.currentTarget.checked ? enabled : [])}
          />
          <CheckboxIndicator class={checkboxIndicatorClassName}>
            <CheckIcon class={checkboxCheckIconClassName} />
            <MinusIcon class={checkboxMinusIconClassName} />
          </CheckboxIndicator>
        </CheckboxRoot>
        <span class="min-w-0 flex-1 truncate font-medium">{title()}</span>
        <span class="shrink-0 text-muted-foreground">
          {props.api.checkedKeys.length}/{props.api.items.length}
        </span>
      </>
    )
  }

  const defaultBody = () => (
    <ListboxRoot
      data-variant="transfer"
      multiple
      disabled={props.disabled}
      items={props.api.items}
      value={props.api.checkedKeys}
      getItemValue={(item) => readTransferKey(item, props.fields)}
      getItemDisabled={(item) => props.disabled || readTransferDisabled(item, props.fields)}
      onChange={(keys) =>
        props.api.setCheckedKeys(Array.isArray(keys) ? keys : keys == null ? [] : [keys])
      }
      class={listboxRootClassName({ variant: 'transfer' })}
    >
      <For each={props.api.items}>
        {(item) => {
          const key = () => readTransferKey(item, props.fields)
          return (
            <ListboxItem value={key()} class={listboxItemClassName({ size: 'sm' })}>
              <span
                aria-hidden="true"
                data-checked={props.api.isChecked(key()) || undefined}
                class="flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-border text-primary-foreground data-[checked=true]:border-primary data-[checked=true]:bg-primary"
              >
                {props.api.isChecked(key()) ? <CheckIcon class="size-3" /> : null}
              </span>
              <span class="min-w-0 flex-1 truncate text-sm">
                {props.renderItem?.(item) ?? (item[props.fields.label] as JSX.Element)}
              </span>
            </ListboxItem>
          )
        }}
      </For>
    </ListboxRoot>
  )

  return (
    <section
      data-slot="transfer-panel"
      data-side={props.side}
      class={props.side === 'source' ? transferSourcePanelClassName : transferTargetPanelClassName}
    >
      <Show when={props.options?.header !== false}>
        <header data-slot="transfer-panel-header" class={transferPanelHeaderClassName}>
          {typeof props.options?.header === 'function' ? props.options.header(props.api) : defaultHeader()}
        </header>
      </Show>
      <div data-slot="transfer-panel-body" class={transferPanelBodyClassName}>
        {props.options?.body?.(props.api) ?? defaultBody()}
      </div>
      <Show when={props.options?.footer}>
        {(footer) => (
          <footer data-slot="transfer-panel-footer" class={transferPanelFooterClassName}>
            {footer()(props.api)}
          </footer>
        )}
      </Show>
    </section>
  )
}
