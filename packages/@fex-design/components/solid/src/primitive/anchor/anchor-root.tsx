import type {
  AnchorActiveMode,
  AnchorOrientation,
  AnchorRegisteredItem,
} from '@fex-design/core/anchor/types'
import { anchorRootClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { createAnchor } from './create-anchor'
import { AnchorContext } from './anchor-context'

export type AnchorRootProps = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLElement>, 'onChange'> & {
    activeKeys?: readonly string[]
    defaultActiveKeys?: readonly string[]
    activeMode?: AnchorActiveMode
    orientation?: AnchorOrientation
    container?: Window | HTMLElement | (() => Window | HTMLElement | null | undefined)
    targetOffset?: number
    threshold?: number
    behavior?: ScrollBehavior
    onChange?: (keys: readonly string[], items: readonly AnchorRegisteredItem[]) => void
  }
>

export function AnchorRoot(props: AnchorRootProps) {
  const [local, rest] = splitProps(props, [
    'activeKeys',
    'defaultActiveKeys',
    'activeMode',
    'orientation',
    'container',
    'targetOffset',
    'threshold',
    'behavior',
    'onChange',
    'class',
    'children',
    'ref',
  ])
  const anchor = createAnchor({
    activeKeys: () => local.activeKeys,
    defaultActiveKeys: local.defaultActiveKeys,
    activeMode: () => local.activeMode ?? 'current',
    orientation: () => local.orientation ?? 'vertical',
    container: () =>
      typeof local.container === 'function' ? local.container() : (local.container ?? window),
    targetOffset: () => local.targetOffset ?? 0,
    threshold: () => local.threshold ?? 16,
    behavior: () => local.behavior ?? 'smooth',
    onChange: local.onChange,
  })
  return (
    <AnchorContext.Provider value={anchor}>
      <nav
        {...rest}
        ref={(element) => {
          anchor.setRoot(element)
          if (typeof local.ref === 'function') local.ref(element)
        }}
        data-slot="anchor"
        data-orientation={anchor.orientation()}
        class={cn(anchorRootClassName({ orientation: anchor.orientation() }), local.class)}
      >
        {local.children}
      </nav>
    </AnchorContext.Provider>
  )
}
