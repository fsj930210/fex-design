import type { AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { anchorItemClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { onCleanup, onMount, splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import { AnchorItemContext, useAnchorContext } from './anchor-context'

export type AnchorItemProps = ParentProps<
  JSX.HTMLAttributes<HTMLLIElement> & { value: string; target: AnchorTarget; targetOffset?: number }
>

export function AnchorItem(props: AnchorItemProps) {
  const anchor = useAnchorContext('AnchorItem')
  const parent = useContext(AnchorItemContext)
  const [local, rest] = splitProps(props, ['value', 'target', 'targetOffset', 'class', 'children'])
  const item: AnchorRegisteredItem = {
    key: local.value,
    target: local.target,
    ...(local.targetOffset === undefined ? {} : { targetOffset: local.targetOffset }),
    ...(parent ? { parentKey: parent.key } : {}),
  }
  onMount(() => onCleanup(anchor.registerItem(item)))
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
