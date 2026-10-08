import { createToggleGroupController } from '@fex-design/core/toggle/create-toggle-group-controller'
import {
  getToggleGroupFocusIndex,
  type ToggleGroupChangeMeta,
  type ToggleGroupValue,
} from '@fex-design/core/toggle/types'
import {
  toggleGroupClassName,
  type ToggleStyleProps,
} from '@fex-design/components-styles/toggle'
import { cn } from '@fex-design/utils'
import {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
} from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { ToggleGroupContext, type ToggleGroupContextValue } from './toggle-context'

interface ToggleGroupCommonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    ToggleStyleProps {
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  spacing?: number
  rovingFocus?: boolean
  loop?: boolean
  ref?: Ref<HTMLDivElement>
}

export interface ToggleGroupSingleProps extends ToggleGroupCommonProps {
  multiple?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string, meta: ToggleGroupChangeMeta) => void
}

export interface ToggleGroupMultipleProps extends ToggleGroupCommonProps {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[], meta: ToggleGroupChangeMeta) => void
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

export function ToggleGroup({
  multiple = false,
  value,
  defaultValue,
  disabled = false,
  orientation = 'horizontal',
  spacing = 8,
  variant = 'default',
  size = 'md',
  className,
  style,
  ref,
  children,
  onChange,
  onKeyDown,
  ...props
}: ToggleGroupProps) {
  const optionsRef = useRef({
    multiple,
    value: value as ToggleGroupValue | undefined,
    defaultValue: defaultValue as ToggleGroupValue | undefined,
    disabled,
    onChange,
  })
  Object.assign(optionsRef.current, { multiple, value, defaultValue, disabled, onChange })
  const controllerRef = useLazyRef(() =>
    createToggleGroupController({
      get multiple() {
        return optionsRef.current.multiple
      },
      get value() {
        return optionsRef.current.value
      },
      get defaultValue() {
        return optionsRef.current.defaultValue
      },
      get disabled() {
        return optionsRef.current.disabled
      },
      onChange(next, meta) {
        ;(
          optionsRef.current.onChange as
            | ((value: ToggleGroupValue, meta: ToggleGroupChangeMeta) => void)
            | undefined
        )?.(next, meta)
      },
    }),
  )
  const snapshot = useCoreStore(controllerRef.current)
  const context: ToggleGroupContextValue = {
    disabled,
    variant,
    size,
    isPressed: (item) => snapshot.value.includes(item),
    toggle: (item) => controllerRef.current.toggle(item),
  }

  return (
    <ToggleGroupContext value={context}>
      <div
        {...props}
        ref={ref}
        role="group"
        aria-orientation={orientation}
        data-slot="toggle-group"
        data-orientation={orientation}
        style={{ ...style, gap: spacing + 'px' } as CSSProperties}
        className={cn(toggleGroupClassName({ orientation }), className)}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-slot="toggle"]'),
          ).filter((button) => !button.disabled)
          const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)
          const nextIndex = getToggleGroupFocusIndex({
            key: event.key,
            orientation,
            currentIndex,
            itemCount: buttons.length,
            loop: true,
          })
          if (nextIndex !== null) {
            event.preventDefault()
            buttons[nextIndex]?.focus()
          }
        }}
      >
        {children}
      </div>
    </ToggleGroupContext>
  )
}
