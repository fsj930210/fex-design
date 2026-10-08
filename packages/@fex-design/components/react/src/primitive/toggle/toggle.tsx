import { createToggleController } from '@fex-design/core/toggle/create-toggle-controller'
import {
  toggleClassName,
  type ToggleStyleProps,
} from '@fex-design/components-styles/toggle'
import { cn } from '@fex-design/utils'
import {
  use,
  useRef,
  type ButtonHTMLAttributes,
  type Ref,
} from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { Button } from '../button'
import { ToggleGroupContext } from './toggle-context'

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>, ToggleStyleProps {
  pressed?: boolean
  defaultPressed?: boolean
  value?: string
  ref?: Ref<HTMLButtonElement>
  onChange?: (pressed: boolean) => void
}

export function Toggle({
  pressed,
  defaultPressed,
  value,
  disabled = false,
  variant,
  size,
  className,
  ref,
  onClick,
  onChange,
  ...props
}: ToggleProps) {
  const group = use(ToggleGroupContext)
  const optionsRef = useRef({ pressed, defaultPressed, disabled, onChange })
  Object.assign(optionsRef.current, { pressed, defaultPressed, disabled, onChange })
  const controllerRef = useLazyRef(() =>
    createToggleController({
      get pressed() {
        return optionsRef.current.pressed
      },
      get defaultPressed() {
        return optionsRef.current.defaultPressed
      },
      get disabled() {
        return optionsRef.current.disabled
      },
      onChange: (next) => optionsRef.current.onChange?.(next),
    }),
  )
  const snapshot = useCoreStore(controllerRef.current)
  const isGroupItem = group !== null && value !== undefined
  const effectiveDisabled = disabled || (group?.disabled ?? false)
  const effectivePressed = isGroupItem ? group.isPressed(value) : snapshot.pressed
  const effectiveVariant = variant ?? group?.variant ?? 'default'
  const effectiveSize = size ?? group?.size ?? 'md'

  return (
    <Button
      {...props}
      ref={ref}
      disabled={effectiveDisabled}
      aria-pressed={effectivePressed}
      data-slot="toggle"
      data-state={effectivePressed ? 'on' : 'off'}
      data-value={value}
      className={cn(
        toggleClassName({
          variant: effectiveVariant,
          size: effectiveSize,
          pressed: effectivePressed,
        }),
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || effectiveDisabled) return
        if (isGroupItem) {
          group.toggle(value)
          return
        }
        controllerRef.current.toggle()
      }}
    />
  )
}
