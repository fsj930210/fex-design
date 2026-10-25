import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { TreeKey } from '@fex-design/core/tree/types'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox'
import { useTreeContext } from './tree-context'
import { useTreeItem } from './use-tree-item'

export interface TreeCheckboxProps extends Omit<
  ComponentProps<typeof CheckboxControl>,
  'checked' | 'indeterminate'
> {
  itemKey: TreeKey
}

export function TreeCheckbox({ itemKey, className, onChange, ...props }: TreeCheckboxProps) {
  const { tree } = useTreeContext()
  const state = useTreeItem(tree, itemKey)
  const check = tree.getFeature<CheckFeatureApi>('check')
  if (!state.item || !state.item.checkable || !check) return null
  return (
    <CheckboxRoot
      data-slot="tree-checkbox"
      className={cn('shrink-0', className)}
      disabled={state.item.disabled || state.item.disableCheckbox}
    >
      <CheckboxControl
        {...props}
        tabIndex={tree.hasFeature('keyboard') ? -1 : props.tabIndex}
        checked={state.checked}
        indeterminate={state.checkedState === 'indeterminate'}
        aria-checked={state.checkedState === 'indeterminate' ? 'mixed' : state.checked}
        onChange={(event) => {
          onChange?.(event)
          if (!event.defaultPrevented) check.check(itemKey, event.currentTarget.checked)
        }}
        onClick={(event) => event.stopPropagation()}
      />
      <CheckboxIndicator />
    </CheckboxRoot>
  )
}
