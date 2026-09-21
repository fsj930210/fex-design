import { buttonClassName } from '@fex-design/components-styles/button'
import type { ReactNode } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@fex-design/react/icons/chevron'
import { Button } from '../button/button'
import { TransferActions } from './transfer-actions'

function ActionButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick(): void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={buttonClassName({ variant: 'outlined', size: 'icon-md' })}
    >
      {children}
    </Button>
  )
}

export function TransferDefaultActions() {
  return (
    <TransferActions className="flex flex-col gap-2">
      {(api) => (
        <>
          <ActionButton
            label="Move selected to target"
            disabled={!api.canMoveToTarget}
            onClick={api.moveToTarget}
          >
            <ChevronRightIcon />
          </ActionButton>
          <ActionButton
            label="Move selected to source"
            disabled={!api.canMoveToSource}
            onClick={api.moveToSource}
          >
            <ChevronLeftIcon />
          </ActionButton>
          <ActionButton
            label="Move all to target"
            disabled={!api.canMoveAllToTarget}
            onClick={api.moveAllToTarget}
          >
            <ChevronsRightIcon />
          </ActionButton>
          <ActionButton
            label="Move all to source"
            disabled={!api.canMoveAllToSource}
            onClick={api.moveAllToSource}
          >
            <ChevronsLeftIcon />
          </ActionButton>
        </>
      )}
    </TransferActions>
  )
}
