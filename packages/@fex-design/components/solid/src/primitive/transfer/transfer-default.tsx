import { createTransferController } from '@fex-design/core/transfer/create-transfer-controller'
import type {
  TransferControllerOptions,
  TransferDataItem,
  TransferKey,
  TransferSide,
  TransferSnapshot,
} from '@fex-design/core/transfer/types'
import { resolveTransferFieldNames } from '@fex-design/core/transfer/utils'
import {
  transferLayoutClassName,
  transferMessageClassName,
  transferRootClassName,
  transferWarningMessageClassName,
} from '@fex-design/components-styles/transfer'
import { cn } from '@fex-design/utils'
import { createEffect, createMemo, Show, splitProps, type JSX } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import {
  TransferPanel,
  type TransferPanelApi,
  type TransferPanelOptions,
} from './transfer-panel'
import { TransferActions } from './transfer-actions'

export type { TransferPanelApi, TransferPanelOptions } from './transfer-panel'
export type { TransferActionsProps } from './transfer-actions'

export interface TransferProps<
  TItem extends TransferDataItem,
> extends TransferControllerOptions<TItem> {
  title?: { source?: JSX.Element; target?: JSX.Element } | undefined
  panels?:
    | { source?: TransferPanelOptions<TItem>; target?: TransferPanelOptions<TItem> }
    | undefined
  actions?:
    | ((
        controller: ReturnType<typeof createTransferController<TItem>>,
        snapshot: TransferSnapshot<TItem>,
      ) => JSX.Element)
    | undefined
  renderItem?: ((item: TItem) => JSX.Element) | undefined
  validation?: { status: 'error' | 'warning'; message: JSX.Element } | undefined
  class?: string | undefined
}

export function Transfer<TItem extends TransferDataItem>(props: TransferProps<TItem>) {
  const [local] = splitProps(props, [
    'items',
    'fieldNames',
    'disabled',
    'targetKeys',
    'defaultTargetKeys',
    'checkedKeys',
    'defaultCheckedKeys',
    'onChange',
    'onCheckedChange',
  ])
  const controller = createTransferController({
    items: local.items,
    fieldNames: local.fieldNames,
    disabled: local.disabled,
    targetKeys: local.targetKeys,
    defaultTargetKeys: local.defaultTargetKeys,
    checkedKeys: local.checkedKeys,
    defaultCheckedKeys: local.defaultCheckedKeys,
    onChange: (keys, meta) => local.onChange?.(keys, meta),
    onCheckedChange: (keys, meta) => local.onCheckedChange?.(keys, meta),
  })
  const snapshot = createCoreStoreSignal(controller)
  createEffect(() =>
    controller.updateOptions({
      items: local.items,
      fieldNames: local.fieldNames,
      disabled: local.disabled,
      targetKeys: local.targetKeys,
      checkedKeys: local.checkedKeys,
    }),
  )
  const fields = createMemo(() => resolveTransferFieldNames(local.fieldNames))
  const api = (side: TransferSide): TransferPanelApi<TItem> => {
    const source = side === 'source'
    return {
      side,
      get items() {
        const state = snapshot()
        return source ? state.sourceItems : state.targetItems
      },
      get checkedKeys() {
        const state = snapshot()
        return source ? state.sourceCheckedKeys : state.targetCheckedKeys
      },
      controller,
      setCheckedKeys: source ? controller.setSourceCheckedKeys : controller.setTargetCheckedKeys,
      isChecked: (key) => {
        const state = snapshot()
        return (source ? state.sourceCheckedKeys : state.targetCheckedKeys).includes(key)
      },
    }
  }

  const can = (action: 'target' | 'source' | 'allTarget' | 'allSource') => {
    snapshot()
    return action === 'target'
      ? controller.canMoveToTarget()
      : action === 'source'
        ? controller.canMoveToSource()
        : action === 'allTarget'
          ? controller.canMoveAllToTarget()
          : controller.canMoveAllToSource()
  }

  return (
    <div
      data-slot="transfer-root"
      data-invalid={props.validation?.status === 'error' || undefined}
      aria-invalid={props.validation?.status === 'error' || undefined}
      class={cn(
        transferRootClassName,
        props.validation?.status === 'warning' &&
          '[&_[data-slot=transfer-panel]]:border-warning [&_[data-slot=transfer-panel]]:ring-3 [&_[data-slot=transfer-panel]]:ring-warning/20',
        props.class,
      )}
    >
      <div data-slot="transfer-layout" class={transferLayoutClassName}>
        <TransferPanel
          side="source"
          api={api('source')}
          fields={fields()}
          disabled={local.disabled}
          title={props.title?.source}
          options={props.panels?.source}
          renderItem={props.renderItem}
        />
        <TransferActions
          controller={controller}
          canTarget={can('target')}
          canSource={can('source')}
          canAllTarget={can('allTarget')}
          canAllSource={can('allSource')}
        >
          {props.actions?.(controller, snapshot())}
        </TransferActions>
        <TransferPanel
          side="target"
          api={api('target')}
          fields={fields()}
          disabled={local.disabled}
          title={props.title?.target}
          options={props.panels?.target}
          renderItem={props.renderItem}
        />
      </div>
      <Show when={props.validation}>
        {(validation) => (
          <div
            data-slot="transfer-message"
            role={validation().status === 'error' ? 'alert' : undefined}
            class={
              validation().status === 'warning'
                ? transferWarningMessageClassName
                : transferMessageClassName
            }
          >
            {validation().message}
          </div>
        )}
      </Show>
    </div>
  )
}
