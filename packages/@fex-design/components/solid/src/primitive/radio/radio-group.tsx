import { useNativeControlTarget } from '@fex-design/solid/primitives/native-control-target'
import { createSelectionController } from '@fex-design/core/selection/create-selection-controller'
import type { SelectionChangeMeta } from '@fex-design/core/selection/types'
import { radioGroupClassName, type RadioGroupStyleProps } from '@fex-design/components-styles/radio'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { RadioContext, type RadioChangeMeta, type RadioValue } from './radio-context'

export interface RadioGroupProps
  extends
    ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>>,
    RadioGroupStyleProps {
  value?: RadioValue
  defaultValue?: RadioValue
  disabled?: boolean
  onChange?: (value: RadioValue, meta: RadioChangeMeta) => void
}

function toRadioChangeMeta(value: RadioValue, meta: SelectionChangeMeta): RadioChangeMeta {
  return {
    previousValue: meta.previousValues[0],
    value,
    changedValues: meta.changedValues,
  }
}

export function RadioGroup(props: RadioGroupProps) {
  const nativeTarget = useNativeControlTarget()
  const [local, rest] = splitProps(props, [
    'ref',
    'value',
    'defaultValue',
    'disabled',
    'orientation',
    'class',
    'children',
    'onChange',
  ])
  const controller = createSelectionController({
    get value() {
      return local.value
    },
    get defaultValue() {
      return local.defaultValue
    },
    get multiple() {
      return false
    },
    onChange(values, meta) {
      const nextValue = values[0]
      if (nextValue === undefined) return
      local.onChange?.(nextValue, toRadioChangeMeta(nextValue, meta))
    },
  })
  const snapshot = createCoreStoreSignal(controller)
  const currentValue = () => local.value ?? snapshot().value
  const orientation = () => local.orientation ?? 'horizontal'

  return (
    <RadioContext.Provider
      value={{
        value: currentValue,
        disabled: () => local.disabled === true,
        select: (nextValue) => controller.replace(nextValue),
      }}
    >
      <div
        {...rest}
        ref={(element) => {
          nativeTarget(element)
          if (typeof local.ref === 'function') local.ref(element)
        }}
        role="radiogroup"
        data-slot="radio-group"
        data-orientation={orientation()}
        data-disabled={local.disabled ? 'true' : undefined}
        class={cn(radioGroupClassName({ orientation: orientation() }), local.class)}
      >
        {local.children}
      </div>
    </RadioContext.Provider>
  )
}
