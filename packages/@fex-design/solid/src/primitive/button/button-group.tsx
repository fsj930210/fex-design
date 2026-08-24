import { buttonGroupClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import type { ButtonGroupProps } from './button.types'

export function ButtonGroup(props: ButtonGroupProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'orientation', 'spacing', 'style'])
  const connected = () => (local.spacing ?? 0) === 0
  const gap = () => (typeof local.spacing === 'number' ? `${local.spacing}px` : local.spacing)
  const style = (): JSX.CSSProperties | string =>
    typeof local.style === 'string'
      ? `${local.style};gap:${gap() ?? ''}`
      : { ...local.style, gap: gap() }

  return (
    <div
      {...rest}
      role="group"
      data-slot="button-group"
      data-orientation={local.orientation ?? 'horizontal'}
      class={cn(
        buttonGroupClassName({ orientation: local.orientation, connected: connected() }),
        local.class,
      )}
      style={style()}
    >
      {local.children}
    </div>
  )
}
