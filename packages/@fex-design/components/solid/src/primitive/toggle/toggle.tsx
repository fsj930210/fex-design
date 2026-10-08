import {
  toggleClassName,
  type ToggleStyleProps,
} from '@fex-design/components-styles/toggle'
import { cn } from '@fex-design/utils'
import {
  createSignal,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { Button } from '../button'
import { ToggleGroupContext } from './toggle-context'

export interface ToggleProps
  extends
    ParentProps<Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>>,
    ToggleStyleProps {
  pressed?: boolean
  defaultPressed?: boolean
  value?: string
  onChange?: (pressed: boolean) => void
}

export function Toggle(props: ToggleProps) {
  const [local, rest] = splitProps(props, [
    'pressed',
    'defaultPressed',
    'value',
    'disabled',
    'variant',
    'size',
    'class',
    'onClick',
    'onChange',
    'children',
  ])
  const group = useContext(ToggleGroupContext)
  const isGroupItem = () => group !== undefined && local.value !== undefined
  const [uncontrolledPressed, setUncontrolledPressed] = createSignal(local.defaultPressed ?? false)
  const isPressed = () => {
    if (isGroupItem()) return group!.isPressed(local.value!)
    return local.pressed ?? uncontrolledPressed()
  }
  const isDisabled = () => (local.disabled ?? false) || (group?.disabled() ?? false)
  const variant = () => local.variant ?? group?.variant() ?? 'default'
  const size = () => local.size ?? group?.size() ?? 'md'

  return (
    <Button
      {...rest}
      disabled={isDisabled()}
      aria-pressed={isPressed()}
      data-slot="toggle"
      data-state={isPressed() ? 'on' : 'off'}
      data-value={local.value}
      class={cn(
        toggleClassName({
          variant: variant(),
          size: size(),
          pressed: isPressed(),
        }),
        local.class,
      )}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (event.defaultPrevented || isDisabled()) return
        if (isGroupItem()) {
          group!.toggle(local.value!)
          return
        }
        const next = !isPressed()
        if (local.pressed === undefined) setUncontrolledPressed(next)
        local.onChange?.(next)
      }}
    >
      {local.children}
    </Button>
  )
}
