import { createCheckboxGroupController } from '@fex-design/core/checkbox/create-checkbox-group-controller'
import type { CheckboxGroupChangeMeta, CheckboxValue } from '@fex-design/core/checkbox/types'
import {
  checkboxGroupClassName,
  type CheckboxGroupStyleProps,
} from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import { useRef, type HTMLAttributes, type Ref } from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { GroupContext } from './checkbox-context'

export interface CheckboxGroupProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    CheckboxGroupStyleProps {
  value?: readonly CheckboxValue[]
  defaultValue?: readonly CheckboxValue[]
  disabled?: boolean
  onChange?: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => void
  ref?: Ref<HTMLDivElement>
}

export function CheckboxGroup({
  value,
  defaultValue,
  disabled,
  onChange,
  orientation = 'vertical',
  className,
  ref,
  ...props
}: CheckboxGroupProps) {
  const options = useRef({ value, defaultValue, disabled, onChange })
  options.current = { value, defaultValue, disabled, onChange }
  const controller = useLazyRef(() =>
    createCheckboxGroupController({
      get value() {
        return options.current.value
      },
      get defaultValue() {
        return options.current.defaultValue
      },
      get disabled() {
        return options.current.disabled
      },
      onChange: (next, meta) => options.current.onChange?.(next, meta),
    }),
  ).current
  const store = useCoreStore(controller)
  return (
    <GroupContext
      value={{
        value: [...store.value],
        disabled: Boolean(disabled),
        toggle: controller.toggle,
      }}
    >
      <div
        {...props}
        ref={ref}
        role="group"
        data-slot="checkbox-group"
        data-orientation={orientation}
        className={cn(checkboxGroupClassName({ orientation }), className)}
      />
    </GroupContext>
  )
}
