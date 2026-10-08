import { anchorIndicatorClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { For, splitProps, type JSX } from 'solid-js'
import { useAnchorContext } from './anchor-context'

export function AnchorIndicator(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const anchor = useAnchorContext('AnchorIndicator')
  const [local, rest] = splitProps(props, ['class', 'style'])
  return (
    <For each={anchor.inkStyles()}>
      {(inkStyle) => (
        <span
          {...rest}
          data-slot="anchor-indicator"
          class={cn(anchorIndicatorClassName({ orientation: anchor.orientation() }), local.class)}
          style={{
            ...(typeof local.style === 'object' ? local.style : {}),
            top: inkStyle.top === undefined ? undefined : inkStyle.top + 'px',
            left: inkStyle.left === undefined ? undefined : inkStyle.left + 'px',
            width: inkStyle.width === undefined ? undefined : inkStyle.width + 'px',
            height: inkStyle.height === undefined ? undefined : inkStyle.height + 'px',
          }}
        />
      )}
    </For>
  )
}
