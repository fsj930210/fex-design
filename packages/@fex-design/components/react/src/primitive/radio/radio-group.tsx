import { createSelectionController } from "@fex-design/core/selection/create-selection-controller"
import type { SelectionChangeMeta } from "@fex-design/core/selection/types"
import { radioGroupClassName, type RadioGroupStyleProps } from "@fex-design/components-styles/radio"
import { cn } from "@fex-design/utils"
import { useRef, type HTMLAttributes, type Ref } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useLazyRef } from "@fex-design/react/hooks/use-lazy-ref"
import { RadioContext, type RadioChangeMeta, type RadioValue } from "./radio-context"

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">, RadioGroupStyleProps {
  value?: RadioValue
  defaultValue?: RadioValue
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
  onValueChange?: (value: RadioValue, meta: RadioChangeMeta) => void
}

function toRadioChangeMeta(value: RadioValue, meta: SelectionChangeMeta): RadioChangeMeta {
  return {
    previousValue: meta.previousValues[0],
    value,
    changedValues: meta.changedValues,
  }
}

export function RadioGroup({
  value,
  defaultValue,
  disabled = false,
  orientation = "horizontal",
  className,
  ref,
  children,
  onValueChange,
  ...props
}: RadioGroupProps) {
  const optionsRef = useRef({ value, defaultValue, disabled, onValueChange })
  Object.assign(optionsRef.current, { value, defaultValue, disabled, onValueChange })
  const controllerRef = useLazyRef(() =>
    createSelectionController({
      get value() {
        return optionsRef.current.value
      },
      get defaultValue() {
        return optionsRef.current.defaultValue
      },
      get multiple() {
        return false
      },
      onChange(values, meta) {
        const nextValue = values[0]
        if (nextValue === undefined) return
        optionsRef.current.onValueChange?.(nextValue, toRadioChangeMeta(nextValue, meta))
      },
    }),
  )
  const snapshot = useCoreStore(controllerRef.current)
  const currentValue = value ?? snapshot.value

  return (
    <RadioContext
      value={{
        value: currentValue,
        disabled,
        select: (nextValue) => controllerRef.current.replace(nextValue),
      }}
    >
      <div
        {...props}
        ref={ref}
        role="radiogroup"
        data-slot="radio-group"
        data-orientation={orientation}
        data-disabled={disabled ? "true" : undefined}
        className={cn(radioGroupClassName({ orientation }), className)}
      >
        {children}
      </div>
    </RadioContext>
  )
}
