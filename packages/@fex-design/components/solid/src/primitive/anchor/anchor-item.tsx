import type { AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { anchorItemClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  onCleanup,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { AnchorItemContext, useAnchorContext } from './anchor-context'

export type AnchorItemProps = ParentProps<
  JSX.HTMLAttributes<HTMLLIElement> & { value: string; target: AnchorTarget; targetOffset?: number }
>

export function AnchorItem(props: AnchorItemProps) {
  const anchor = useAnchorContext('AnchorItem')
  const parent = useContext(AnchorItemContext)
  const [local, rest] = splitProps(props, ['value', 'target', 'targetOffset', 'class', 'children'])
  const item: AnchorRegisteredItem = {
    get key() {
      return local.value
    },
    get target() {
      return local.target
    },
    get targetOffset() {
      return local.targetOffset
    },
    get parentKey() {
      return parent?.key
    },
  }
  // Registration is an external registry boundary; re-register changed item identity/targets.
  createEffect(() => onCleanup(anchor.registerItem({ ...item })))
  return (
    <AnchorItemContext.Provider value={item}>
      <li
        {...rest}
        data-slot="anchor-item"
        data-active={anchor.activeKeys().includes(local.value) || undefined}
        data-highlighted={anchor.highlightedKeys().has(local.value) || undefined}
        class={cn(anchorItemClassName, local.class)}
      >
        {local.children}
      </li>
    </AnchorItemContext.Provider>
  )
}
