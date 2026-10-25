import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { TreeKey } from '@fex-design/core/tree/types'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxRoot,
} from '@fex-design/solid/primitive/checkbox'
import { useTreeContext } from './tree-context'
import { createTreeItem } from './create-tree-item'

export interface TreeCheckboxProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked'
> {
  itemKey: TreeKey
}

export function TreeCheckbox(props: TreeCheckboxProps) {
  const [local, attrs] = splitProps(props, ['itemKey', 'class', 'onChange'])
  const { tree } = useTreeContext()
  const state = createTreeItem(tree, local.itemKey)
  const check = tree.getFeature<CheckFeatureApi>('check')
  return () => {
    const current = state()
    if (!current.item || !current.item.checkable || !check) return null
    return (
      <CheckboxRoot
        data-slot="tree-checkbox"
        class={cn('shrink-0', local.class)}
        disabled={current.item.disabled || current.item.disableCheckbox}
      >
        <CheckboxControl
          {...attrs}
          tabIndex={tree.hasFeature('keyboard') ? -1 : attrs.tabIndex}
          checked={current.checked}
          indeterminate={current.checkedState === 'indeterminate'}
          aria-checked={current.checkedState === 'indeterminate' ? 'mixed' : current.checked}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            local.onChange?.(event)
            if (!event.defaultPrevented) check.check(local.itemKey, event.currentTarget.checked)
          }}
        />
        <CheckboxIndicator />
      </CheckboxRoot>
    )
  }
}
