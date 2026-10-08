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
  createSignal,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { ToggleGroupContext, type GroupContext } from './toggle-context'

type Common = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> & ToggleStyleProps
> & {
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  spacing?: number
}

export type ToggleGroupProps = Common &
  (
    | {
        multiple?: false
        value?: string
        defaultValue?: string
        onChange?: (value: string, meta: ToggleGroupChangeMeta) => void
      }
    | {
        multiple: true
        value?: string[]
        defaultValue?: string[]
        onChange?: (value: string[], meta: ToggleGroupChangeMeta) => void
      }
  )

export function ToggleGroup(props: ToggleGroupProps) {
  const [local, rest] = splitProps(props, [
    'multiple',
    'value',
    'defaultValue',
    'disabled',
    'orientation',
    'spacing',
    'variant',
    'size',
    'class',
    'style',
    'children',
    'onChange',
    'onKeyDown',
  ])
  const [uncontrolledValue, setUncontrolledValue] = createSignal<ToggleGroupValue>(
    local.defaultValue ?? (local.multiple ? [] : ''),
  )
  const isControlled = () => local.value !== undefined
  const currentValue = () => (isControlled() ? local.value! : uncontrolledValue())
  const controller = createToggleGroupController({
    get multiple() {
      return local.multiple ?? false
    },
    get value() {
      return currentValue()
    },
    get disabled() {
      return local.disabled ?? false
    },
    onChange(next, meta) {
      if (!isControlled()) setUncontrolledValue(next)
      ;(local.onChange as ((value: ToggleGroupValue, meta: ToggleGroupChangeMeta) => void) | undefined)?.(
        next,
        meta,
      )
    },
  })
  const groupContext: GroupContext = {
    disabled: () => local.disabled ?? false,
    variant: () => local.variant ?? 'default',
    size: () => local.size ?? 'md',
    isPressed: (item) => controller.getSnapshot().value.includes(item),
    toggle: (item) => controller.toggle(item),
  }
  const orientation = () => local.orientation ?? 'horizontal'

  return (
    <ToggleGroupContext.Provider value={groupContext}>
      <div
        {...rest}
        role="group"
        aria-orientation={orientation()}
        data-slot="toggle-group"
        data-orientation={orientation()}
        style={{
          ...(typeof local.style === 'object' ? local.style : {}),
          gap: (local.spacing ?? 8) + 'px',
        }}
        class={cn(toggleGroupClassName({ orientation: orientation() }), local.class)}
        onKeyDown={(event) => {
          if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
          if (event.defaultPrevented) return
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-slot="toggle"]'),
          ).filter((button) => !button.disabled)
          const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)
          const nextIndex = getToggleGroupFocusIndex({
            key: event.key,
            orientation: orientation(),
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
        {local.children}
      </div>
    </ToggleGroupContext.Provider>
  )
}
