import type { createTransferController } from '@fex-design/core/transfer/create-transfer-controller'
import { buttonClassName } from '@fex-design/components-styles/button'
import { transferActionsClassName } from '@fex-design/components-styles/transfer'
import type { JSX } from 'solid-js'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@fex-design/solid/icons/chevron'
import { Button } from '../button'

export interface TransferActionsProps<TItem extends any = any> {
  controller: ReturnType<typeof createTransferController<TItem>>
  canTarget: boolean
  canSource: boolean
  canAllTarget: boolean
  canAllSource: boolean
  children?: JSX.Element | undefined
}

export function TransferActions<TItem extends any = any>(props: TransferActionsProps<TItem>) {
  return (
    <div data-slot="transfer-actions" class={transferActionsClassName}>
      {props.children ?? (
        <>
          <Button
            type="button"
            class={buttonClassName({ variant: 'outlined', size: 'icon-md' })}
            disabled={!props.canTarget}
            aria-label="Move selected to target"
            onClick={props.controller.moveToTarget}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            type="button"
            class={buttonClassName({ variant: 'outlined', size: 'icon-md' })}
            disabled={!props.canSource}
            aria-label="Move selected to source"
            onClick={props.controller.moveToSource}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            type="button"
            class={buttonClassName({ variant: 'outlined', size: 'icon-md' })}
            disabled={!props.canAllTarget}
            aria-label="Move all to target"
            onClick={props.controller.moveAllToTarget}
          >
            <ChevronsRightIcon />
          </Button>
          <Button
            type="button"
            class={buttonClassName({ variant: 'outlined', size: 'icon-md' })}
            disabled={!props.canAllSource}
            aria-label="Move all to source"
            onClick={props.controller.moveAllToSource}
          >
            <ChevronsLeftIcon />
          </Button>
        </>
      )}
    </div>
  )
}
