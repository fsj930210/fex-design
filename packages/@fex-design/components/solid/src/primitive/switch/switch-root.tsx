import type { SwitchOptions } from '@fex-design/core/switch/types'
import { switchClassName } from '@fex-design/components-styles/switch'
import { cn } from '@fex-design/utils'
import { createSignal, splitProps, type JSX } from 'solid-js'
export type SwitchRootProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'type' | 'role'
> &
  SwitchOptions & { onChange?: (checked: boolean, event: MouseEvent) => void }
export function SwitchRoot(props: SwitchRootProps) {
  const [local, rest] = splitProps(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'loading',
    'size',
    'shape',
    'class',
    'onClick',
    'onChange',
  ])
  const [internalChecked, setChecked] = createSignal(local.defaultChecked ?? false)
  const checked = () => local.checked ?? internalChecked()
  return (
    <button
      {...rest}
      type="button"
      role="switch"
      disabled={local.disabled || local.loading}
      aria-checked={checked()}
      aria-busy={local.loading || undefined}
      data-slot="switch"
      data-state={checked() ? 'checked' : 'unchecked'}
      data-loading={local.loading ? '' : undefined}
      data-disabled={local.disabled ? '' : undefined}
      data-size={local.size ?? 'md'}
      data-shape={local.shape ?? 'rounded'}
      class={cn(
        switchClassName({ size: local.size ?? 'md', shape: local.shape ?? 'rounded' }),
        local.class,
      )}
      onClick={(event) => {
        const handler = local.onClick
        if (typeof handler === 'function') handler(event)
        else if (handler) handler[0](handler[1], event)
        if (event.defaultPrevented || local.disabled || local.loading) return
        const next = !checked()
        if (local.checked === undefined) setChecked(next)
        local.onChange?.(next, event)
      }}
    />
  )
}
